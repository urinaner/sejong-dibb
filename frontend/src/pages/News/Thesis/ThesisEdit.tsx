import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import ThesisForm from './ThesisForm';
import {
  AlertModal,
  FormErrorModal,
  ConfirmModal,
} from '../../../components/Modal/templates/AlertModal';

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

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
}

const ThesisEdit: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 모달 상태 관리
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });
  const [formErrorState, setFormErrorState] = useState({
    isOpen: false,
    message: '',
  });
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    isLoading: false,
  });

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

  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'error' = 'success',
  ) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const showFormError = (message: string) => {
    setFormErrorState({
      isOpen: true,
      message,
    });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  const closeFormError = () => {
    setFormErrorState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSuccessAndNavigate = (message: string, path: string) => {
    showAlert('성공', message, 'success');
    setTimeout(() => {
      navigate(path);
    }, 1500);
  };

  const handleCancel = () => {
    navigate(-1);
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
        showAlert(
          '데이터 로드 실패',
          '논문 정보를 불러오는데 실패했습니다.',
          'error',
        );
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

      if (file.size > 5 * 1024 * 1024) {
        showAlert(
          '파일 크기 초과',
          '이미지 크기는 5MB를 초과할 수 없습니다.',
          'error',
        );
        return;
      }

      if (!file.type.startsWith('image/')) {
        showAlert(
          '잘못된 파일 형식',
          '이미지 파일만 업로드할 수 있습니다.',
          'error',
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
    [],
  );

  const handleDelete = async () => {
    setConfirmState((prev) => ({ ...prev, isLoading: true }));
    try {
      await axios.delete(apiEndpoints.thesis.delete(id));
      handleSuccessAndNavigate(
        '논문이 성공적으로 삭제되었습니다.',
        '/news/thesis',
      );
    } catch (error) {
      console.error('Error deleting thesis:', error);
      showAlert(
        '논문 삭제 실패',
        '논문 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
        'error',
      );
    } finally {
      setConfirmState({ isOpen: false, isLoading: false });
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
      showFormError('저자, 저널명, 내용은 필수 입력 항목입니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedData = { ...formData };

      if (imageFile) {
        const imageUrl = await handleImageUpload(imageFile);
        updatedData.thesisImage = imageUrl;
      }

      await axios.post(apiEndpoints.thesis.update(id), updatedData);
      handleSuccessAndNavigate(
        '논문이 성공적으로 수정되었습니다.',
        `/news/thesis/${id}`,
      );
    } catch (error) {
      console.error('Error updating thesis:', error);
      showAlert(
        '논문 수정 실패',
        '논문 수정 중 오류가 발생했습니다. 다시 시도해주세요.',
        'error',
      );
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
    <>
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

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />

      {/* Form Error Modal */}
      <FormErrorModal
        isOpen={formErrorState.isOpen}
        onClose={closeFormError}
        message={formErrorState.message}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleDelete}
        title="논문 삭제"
        message="정말 이 논문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        isLoading={confirmState.isLoading}
      />
    </>
  );
};

export default ThesisEdit;
