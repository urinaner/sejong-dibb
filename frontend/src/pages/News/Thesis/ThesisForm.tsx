import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Image as ImageIcon } from 'lucide-react';
import * as S from './ThesisCreateStyle';

interface ThesisFormProps {
  formData: {
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
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageError: () => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
  imagePreview: string | null;
  thumbnailError: boolean;
  error?: string | null;
  onDelete?: () => void;
}

const DEFAULT_THUMBNAIL = '/paperImage.png';

const ThesisForm: React.FC<ThesisFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onImageChange,
  onImageError,
  isSubmitting,
  mode,
  onDelete,
  imagePreview,
  thumbnailError,
  error,
}) => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Header>
          <h1>{mode === 'create' ? '논문 등록' : '논문 수정'}</h1>
        </S.Header>

        {error && (
          <S.ErrorMessage>
            <AlertTriangle size={20} />
            {error}
          </S.ErrorMessage>
        )}

        <S.FormSection onSubmit={onSubmit}>
          <S.FormGroup>
            <S.Label>썸네일 이미지</S.Label>
            <S.ImageUploadContainer>
              <S.ImagePreviewContainer>
                {thumbnailError ? (
                  <S.FallbackThumbnail>
                    <ImageIcon size={48} />
                    <span>이미지를 불러올 수 없습니다</span>
                  </S.FallbackThumbnail>
                ) : (
                  <img
                    src={imagePreview || DEFAULT_THUMBNAIL}
                    alt="논문 썸네일 미리보기"
                    onError={onImageError}
                  />
                )}
              </S.ImagePreviewContainer>
              <S.ImageUploadButton>
                이미지 {mode === 'create' ? '업로드' : '변경'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  style={{ display: 'none' }}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>논문 링크</S.Label>
            <S.Input
              type="url"
              name="link"
              value={formData.link}
              onChange={onChange}
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
                  onChange={onChange}
                  placeholder="Vol."
                />
              </div>
              <div>
                <S.Input
                  type="text"
                  name="publicationIssue"
                  value={formData.publicationIssue}
                  onChange={onChange}
                  placeholder="No."
                />
              </div>
              <div>
                <S.Input
                  type="text"
                  name="publicationPage"
                  value={formData.publicationPage}
                  onChange={onChange}
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
              onChange={onChange}
              placeholder="ISSN 번호를 입력하세요"
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.CancelButton type="button" onClick={() => navigate('/thesis')}>
              취소
            </S.CancelButton>
            {mode === 'edit' && onDelete && (
              <S.DeleteButton type="button" onClick={onDelete}>
                삭제
              </S.DeleteButton>
            )}
            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.FormSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ThesisForm;
