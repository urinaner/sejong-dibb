import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './ThesisCreateStyle';
import { WriteButton } from '../NoticeBoard/NoticeBoardStyle';
import useAuth from '../../../hooks/useAuth';
import { Image as ImageIcon } from 'lucide-react';
import {
  AlertModal,
  FormErrorModal,
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

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
}

const ThesisCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const auth = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState(false);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post<{ imageUrl: string }>(
      apiEndpoints.upload.image,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data.imageUrl;
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

      const response = await axios.post(
        apiEndpoints.thesis.create,
        updatedData,
      );

      if (response.status === 200) {
        showAlert('등록 완료', '논문이 성공적으로 등록되었습니다.');
        navigate('/news/thesis');
      }
    } catch (error) {
      console.error('Error creating thesis:', error);
      showAlert(
        '논문 등록 실패',
        '논문 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
        'error',
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  const closeFormError = () => {
    setFormErrorState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSuccessAndNavigate = (message: string) => {
    showAlert('성공', message, 'success');
    setTimeout(() => {
      navigate('/news/thesis');
    }, 1500); // 1.5초 후 이동
  };

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

  return (
    <>
      <S.Container>
        <S.ContentWrapper>
          <S.Header>
            <h1>논문 등록</h1>
          </S.Header>

          <S.FormSection onSubmit={handleSubmit}>
            <S.FormGroup>
              <S.Label>썸네일 이미지</S.Label>
              <S.ImageUploadContainer>
                <S.ImagePreviewContainer>
                  {imagePreview ? (
                    <img src={imagePreview} alt="썸네일 미리보기" />
                  ) : (
                    <S.FallbackThumbnail>
                      <ImageIcon size={48} />
                      <span>이미지를 선택해주세요</span>
                    </S.FallbackThumbnail>
                  )}
                </S.ImagePreviewContainer>
                <S.ImageUploadButton>
                  이미지 업로드
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </S.ImageUploadButton>
                <S.HelperText>
                  * 최대 5MB, JPG/PNG 파일만 업로드 가능합니다.
                </S.HelperText>
              </S.ImageUploadContainer>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                저자<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.Input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="저자명을 입력하세요"
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                저널명<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.Input
                type="text"
                name="journal"
                value={formData.journal}
                onChange={handleInputChange}
                placeholder="저널명을 입력하세요"
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                내용<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.Input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="논문의 제목 또는 주요 내용을 입력하세요"
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>발행일</S.Label>
              <S.Input
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleInputChange}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>논문 링크</S.Label>
              <S.Input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://..."
              />
              <S.HelperText>논문의 원문 링크를 입력하세요.</S.HelperText>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>발행 정보</S.Label>
              <S.PublicationInfoGrid>
                <div>
                  <S.Input
                    type="text"
                    name="publicationCollection"
                    value={formData.publicationCollection}
                    onChange={handleInputChange}
                    placeholder="Vol."
                  />
                </div>
                <div>
                  <S.Input
                    type="text"
                    name="publicationIssue"
                    value={formData.publicationIssue}
                    onChange={handleInputChange}
                    placeholder="No."
                  />
                </div>
                <div>
                  <S.Input
                    type="text"
                    name="publicationPage"
                    value={formData.publicationPage}
                    onChange={handleInputChange}
                    placeholder="pp."
                  />
                </div>
              </S.PublicationInfoGrid>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>ISSN</S.Label>
              <S.Input
                type="text"
                name="issn"
                value={formData.issn}
                onChange={handleInputChange}
                placeholder="ISSN 번호를 입력하세요"
              />
            </S.FormGroup>

            <S.ButtonGroup>
              <S.CancelButton
                type="button"
                onClick={() => navigate('/news/thesis')}
              >
                취소
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '등록 중...' : '논문 등록'}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.FormSection>
        </S.ContentWrapper>
      </S.Container>

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
    </>
  );
};

export default ThesisCreate;
