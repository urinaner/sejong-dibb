import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateThesis } from '../../../hooks/queries/useThesis';
import { ThesisReqDto } from '../../../config/apiConfig';
import * as S from './ThesisCreateStyle';
import { Image as ImageIcon } from 'lucide-react';
import {
  AlertModal,
  FormErrorModal,
} from '../../../components/Modal/templates/AlertModal';

type AlertType = 'success' | 'error';

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: AlertType;
}

const ThesisCreate: React.FC = () => {
  const navigate = useNavigate();
  const createThesisMutation = useCreateThesis();

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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const showAlert = (
    title: string,
    message: string,
    type: AlertType = 'success',
  ) => {
    setAlertState({ isOpen: true, title, message, type });
  };

  const showFormError = (message: string) => {
    setFormErrorState({ isOpen: true, message });
  };

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const thesisReqDto: ThesisReqDto = {
        ...formData,
        author: formData.author.trim(),
        journal: formData.journal.trim(),
        content: formData.content.trim(),
        thesisImage: '',
      };

      await createThesisMutation.mutateAsync(
        { thesisReqDto, imageFile },
        {
          onSuccess: () => {
            showAlert('등록 완료', '논문이 성공적으로 등록되었습니다.');
            setTimeout(() => {
              navigate('/news/thesis');
            }, 1500);
          },
          onError: (error) => {
            console.error('Error creating thesis:', error);
            showAlert(
              '논문 등록 실패',
              '논문 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
              'error',
            );
          },
        },
      );
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  const closeFormError = () => {
    setFormErrorState((prev) => ({ ...prev, isOpen: false }));
  };

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
              <S.TextArea
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
              <S.SubmitButton
                type="submit"
                disabled={createThesisMutation.isPending}
              >
                {createThesisMutation.isPending ? '등록 중...' : '논문 등록'}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.FormSection>
        </S.ContentWrapper>
      </S.Container>

      <AlertModal
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />

      <FormErrorModal
        isOpen={formErrorState.isOpen}
        onClose={closeFormError}
        message={formErrorState.message}
      />
    </>
  );
};

export default ThesisCreate;
