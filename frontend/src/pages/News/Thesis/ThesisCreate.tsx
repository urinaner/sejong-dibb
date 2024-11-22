import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { useModalContext } from '../../../context/ModalContext';
import * as S from './ThesisCreateStyle';
import { WriteButton } from '../NoticeBoard/NoticeBoardStyle';
import useAuth from '../../../hooks/useAuth';

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

const ThesisCreate: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModalContext();
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
  const auth = useAuth();

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

    // Validation check
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
      const response = await axios.post(apiEndpoints.thesis.create, formData);

      if (response.status === 200) {
        openModal(
          <div>
            <h2>논문이 성공적으로 등록되었습니다.</h2>
          </div>,
        );
        navigate('/thesis');
      }
    } catch (error) {
      console.error('Error creating thesis:', error);
      openModal(
        <div>
          <h2>논문 등록 실패</h2>
          <p>논문 등록 중 오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Header>
          <h1>논문 등록</h1>
        </S.Header>

        <S.FormSection onSubmit={handleSubmit}>
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

          <S.FormGroup>
            <S.Label>썸네일 이미지 URL</S.Label>
            <S.Input
              type="url"
              name="thesisImage"
              value={formData.thesisImage}
              onChange={handleInputChange}
              placeholder="이미지 URL을 입력하세요"
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.CancelButton type="button" onClick={() => navigate('/thesis')}>
              취소
            </S.CancelButton>
            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '논문 등록'}
            </S.SubmitButton>
          </S.ButtonGroup>
        </S.FormSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ThesisCreate;
