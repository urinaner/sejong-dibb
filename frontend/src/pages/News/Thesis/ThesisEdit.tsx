import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { useModalContext } from '../../../context/ModalContext';
import ThesisForm from './ThesisForm';

interface ThesisFormData {
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
  thesisImage: string;
  publicationCollection: string;
  publicationIssue: string;
  publicationPage: string;
  issn: string;
  professorId: number;
}

const ThesisEdit: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useModalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ThesisFormData>({
    author: '',
    journal: '',
    content: '',
    link: '',
    publicationDate: '',
    thesisImage: '',
    publicationCollection: '',
    publicationIssue: '',
    publicationPage: '',
    issn: '',
    professorId: 1,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(apiEndpoints.thesis.get(id));
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching thesis:', error);
        const errorMessage = 'Failed to load thesis data';
        setError(errorMessage);
        openModal(
          <div>
            <h2>데이터 로드 실패</h2>
            <p>논문 정보를 불러오는데 실패했습니다.</p>
          </div>,
        );
        navigate('/news/thesis');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchThesis();
    }
  }, [id, navigate, openModal]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.author.trim() ||
      !formData.journal.trim() ||
      !formData.content.trim()
    ) {
      openModal(
        <div>
          <h2>필수 항목을 입력해주세요</h2>
          <p>저자, 저널명, 내용은 필수 입력 항목입니다.</p>
        </div>,
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        apiEndpoints.thesis.update(id),
        formData,
      );

      if (response.status === 200) {
        openModal(
          <div>
            <h2>논문이 성공적으로 수정되었습니다.</h2>
          </div>,
        );
        navigate('/news/thesis');
      }
    } catch (error) {
      console.error('Error updating thesis:', error);
      openModal(
        <div>
          <h2>논문 수정 실패</h2>
          <p>논문 수정 중 오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(apiEndpoints.thesis.delete(id));
      openModal(
        <div>
          <h2>논문이 성공적으로 삭제되었습니다.</h2>
        </div>,
      );
      navigate('/news/thesis');
    } catch (error) {
      console.error('Error deleting thesis:', error);
      openModal(
        <div>
          <h2>논문 삭제 실패</h2>
          <p>논문 삭제 중 오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>,
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ThesisForm
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isSubmitting={isSubmitting}
      mode="edit"
    />
  );
};

export default ThesisEdit;
