import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image as ImageIcon, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
// import { useModalContext } from '../../../context/ModalContext';
import ThesisForm from './ThesisForm';

const DEFAULT_THUMBNAIL = '/paperImage.png';

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

interface ImageUploadResponse {
  imageUrl: string;
}

const ThesisEdit: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const { openModal } = useModalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

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
        // openModal(
        //   <div>
        //     <h2>데이터 로드 실패</h2>
        //     <p>논문 정보를 불러오는데 실패했습니다.</p>
        //   </div>,
        // );
        navigate('/news/thesis');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchThesis();
    }
  }, [id, navigate]);

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

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        // openModal(
        //   <div>
        //     <h2>파일 크기 초과</h2>
        //     <p>이미지 크기는 5MB를 초과할 수 없습니다.</p>
        //   </div>,
        // );
        return;
      }

      // 이미지 타입 체크
      if (!file.type.startsWith('image/')) {
        // openModal(
        //   <div>
        //     <h2>잘못된 파일 형식</h2>
        //     <p>이미지 파일만 업로드할 수 있습니다.</p>
        //   </div>,
        // );
        return;
      }

      setImageFile(file);
      setThumbnailError(false);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleDelete = async () => {
    try {
      await axios.delete(apiEndpoints.thesis.delete(id));
      // openModal(
      //   <div>
      //     <h2>논문이 성공적으로 삭제되었습니다.</h2>
      //   </div>,
      // );
      navigate('/news/thesis');
    } catch (error) {
      console.error('Error deleting thesis:', error);
      // openModal(
      //   <div>
      //     <h2>논문 삭제 실패</h2>
      //     <p>논문 삭제 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      //   </div>,
      // );
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post<ImageUploadResponse>(
        apiEndpoints.upload.image,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.author.trim() ||
      !formData.journal.trim() ||
      !formData.content.trim()
    ) {
      // openModal(
      //   <div>
      //     <h2>필수 항목을 입력해주세요</h2>
      //     <p>저자, 저널명, 내용은 필수 입력 항목입니다.</p>
      //   </div>,
      // );
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedData = { ...formData };

      // 새로운 이미지가 있는 경우 먼저 업로드
      if (imageFile) {
        const imageUrl = await handleImageUpload(imageFile);
        updatedData.thesisImage = imageUrl;
      }

      await axios.post(apiEndpoints.thesis.update(id), updatedData);

      // openModal(
      //   <div>
      //     <h2>논문이 성공적으로 수정되었습니다.</h2>
      //   </div>,
      // );
      navigate(`/news/thesis/${id}`);
    } catch (error) {
      console.error('Error updating thesis:', error);
      // openModal(
      //   <div>
      //     <h2>논문 수정 실패</h2>
      //     <p>논문 수정 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      //   </div>,
      // );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = () => {
    setThumbnailError(true);
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
      onCancel={handleCancel}
    />
  );
};

export default ThesisEdit;
