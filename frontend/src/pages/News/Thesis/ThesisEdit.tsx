import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import API_URL, { apiEndpoints, ThesisReqDto } from '../../../config/apiConfig';
import { Modal, useModal } from '../../../components/Modal';
import ThesisForm from './ThesisForm';

const ThesisEdit: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<ThesisReqDto>({
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

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const response = await axios.get(apiEndpoints.thesis.get(id));
        setFormData(response.data);
        if (response.data.thesisImage) {
          setImagePreview(response.data.thesisImage);
        }
      } catch (error) {
        console.error('Error fetching thesis:', error);
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              데이터 로드 실패
            </Modal.Header>
            <Modal.Content>
              <p>논문 정보를 불러오는데 실패했습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton onClick={() => navigate('/news/thesis')} />
            </Modal.Footer>
          </>,
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchThesis();
    }
  }, [id, navigate, openModal]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              파일 크기 초과
            </Modal.Header>
            <Modal.Content>
              <p>이미지 크기는 5MB를 초과할 수 없습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton />
            </Modal.Footer>
          </>,
        );
        return;
      }

      if (!file.type.startsWith('image/')) {
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              잘못된 파일 형식
            </Modal.Header>
            <Modal.Content>
              <p>이미지 파일만 업로드할 수 있습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton />
            </Modal.Footer>
          </>,
        );
        return;
      }

      setImageFile(file);
      setThumbnailError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [openModal],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.author.trim() ||
      !formData.journal.trim() ||
      !formData.content.trim()
    ) {
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            입력 오류
          </Modal.Header>
          <Modal.Content>
            <p>저자, 저널명, 내용은 필수 입력 항목입니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const thesisReqDto: ThesisReqDto = {
        ...formData,
        author: formData.author.trim(),
        journal: formData.journal.trim(),
        content: formData.content.trim(),
        thesisImage: formData.thesisImage, // 기존 이미지 URL 유지
      };

      // FormData 생성을 apiEndpoints의 helper 함수를 사용하여 처리
      const formDataToSend = apiEndpoints.thesis.update.getFormData(
        thesisReqDto,
        imageFile,
      );

      await axios.post(`${API_URL}/api/thesis/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      openModal(
        <>
          <Modal.Header>
            <CheckCircle size={48} color="#38A169" />
            수정 완료
          </Modal.Header>
          <Modal.Content>
            <p>논문이 성공적으로 수정되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton onClick={() => navigate(`/news/thesis/${id}`)} />
          </Modal.Footer>
        </>,
      );
    } catch (error) {
      console.error('Error updating thesis:', error);
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            수정 실패
          </Modal.Header>
          <Modal.Content>
            <p>논문 수정 중 오류가 발생했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDeleteConfirm = () => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          논문 삭제
        </Modal.Header>
        <Modal.Content>
          <p>정말 이 논문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <Modal.DeleteButton onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? '삭제 중...' : '삭제'}
          </Modal.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(apiEndpoints.thesis.delete(id));
      openModal(
        <>
          <Modal.Header>
            <CheckCircle size={48} color="#38A169" />
            삭제 완료
          </Modal.Header>
          <Modal.Content>
            <p>논문이 성공적으로 삭제되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton onClick={() => navigate('/news/thesis')} />
          </Modal.Footer>
        </>,
      );
    } catch (error) {
      console.error('Error deleting thesis:', error);
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            삭제 실패
          </Modal.Header>
          <Modal.Content>
            <p>논문 삭제 중 오류가 발생했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThesisForm
      formData={formData}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      mode="edit"
      imagePreview={imagePreview}
      onImageChange={handleImageChange}
      onCancel={() => navigate(-1)}
      onDelete={showDeleteConfirm}
    />
  );
};

export default ThesisEdit;
