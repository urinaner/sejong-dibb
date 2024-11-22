import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { AlertTriangle } from 'lucide-react';
import * as S from './ThesisCreateStyle';

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

interface ThesisFormProps {
  formData: ThesisFormData;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
  onDelete?: () => void;
  error?: string;
}

const ThesisForm: React.FC<ThesisFormProps> = ({
  formData,
  onSubmit,
  onChange,
  isSubmitting,
  mode,
  onDelete,
  error,
}) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleCancel = useCallback(() => {
    navigate('/thesis');
  }, [navigate]);

  if (!auth?.isAuthenticated) {
    return (
      <S.Container>
        <S.ErrorMessage>
          <AlertTriangle size={20} />
          접근 권한이 없습니다. 관리자로 로그인해주세요.
        </S.ErrorMessage>
      </S.Container>
    );
  }

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

          <S.FormGroup>
            <S.Label>썸네일 이미지 URL</S.Label>
            <S.Input
              type="url"
              name="thesisImage"
              value={formData.thesisImage}
              onChange={onChange}
              placeholder="이미지 URL을 입력하세요"
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.CancelButton type="button" onClick={handleCancel}>
              취소
            </S.CancelButton>
            {mode === 'edit' && onDelete && (
              <S.DeleteButton type="button" onClick={onDelete}>
                삭제
              </S.DeleteButton>
            )}
            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === 'create'
                  ? '등록 중...'
                  : '수정 중...'
                : mode === 'create'
                  ? '논문 등록'
                  : '논문 수정'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.FormSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ThesisForm;
