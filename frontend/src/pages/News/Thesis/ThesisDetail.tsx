import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Calendar,
  Book,
  Hash,
  Edit,
  Trash2,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle,
} from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { Modal, useModal } from '../../../components/Modal';
import { useThesis, useDeleteThesis } from '../../../hooks/queries/useThesis';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import * as S from './ThesisDetailStyle';

const DEFAULT_THUMBNAIL = '/paperImage.png';

const ThesisDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal, closeModal } = useModal();

  const [thumbnailError, setThumbnailError] = useState(false);

  // React Query hooks
  const { data: thesis, isLoading, error } = useThesis(id);
  const deleteMutation = useDeleteThesis();

  const handleImageError = () => {
    setThumbnailError(true);
  };

  if (isLoading) {
    return (
      <S.Container>
        <LoadingSpinner text="논문 정보를 불러오는 중입니다..." />
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.ErrorContainer>
        <AlertTriangle size={20} />
        {error.message || '논문 정보를 불러오는데 실패했습니다.'}
      </S.ErrorContainer>
    );
  }

  if (!thesis) {
    return (
      <S.ErrorContainer>
        <AlertTriangle size={20} />
        논문을 찾을 수 없습니다.
      </S.ErrorContainer>
    );
  }

  // 삭제 확인 모달
  const showDeleteConfirmModal = () => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          논문 삭제
        </Modal.Header>
        <Modal.Content>
          <p>이 논문을 삭제하시겠습니까?</p>
          <p>삭제된 논문은 복구할 수 없습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton onClick={closeModal} />
          <S.DeleteButton
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </S.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id, {
        onSuccess: () => {
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
                <Modal.CloseButton
                  onClick={() => {
                    closeModal();
                    navigate('/news/thesis');
                  }}
                />
              </Modal.Footer>
            </>,
          );
        },
        onError: () => {
          openModal(
            <>
              <Modal.Header>
                <AlertTriangle size={48} color="#E53E3E" />
                삭제 실패
              </Modal.Header>
              <Modal.Content>
                <p>논문 삭제 중 오류가 발생했습니다.</p>
                <p>다시 시도해 주세요.</p>
              </Modal.Content>
              <Modal.Footer>
                <Modal.CloseButton onClick={closeModal} />
              </Modal.Footer>
            </>,
          );
        },
      });
    } catch (error) {
      console.error('Failed to delete thesis:', error);
    }
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.NavigationSection>
          <S.BackButton onClick={() => navigate('/news/thesis')}>
            ← 목록으로
          </S.BackButton>
        </S.NavigationSection>

        <S.TitleSection>
          <S.Title>{thesis.title}</S.Title>
          <S.Subtitle>{thesis.author}</S.Subtitle>
        </S.TitleSection>

        {auth?.isAuthenticated && (
          <S.ActionSection>
            <S.EditButton
              onClick={() => navigate(`/news/thesis/edit/${thesis.id}`)}
              aria-label="논문 정보 수정"
            >
              <Edit size={18} />
              수정
            </S.EditButton>
            <S.DeleteButton
              onClick={showDeleteConfirmModal}
              disabled={deleteMutation.isPending}
            >
              <Trash2 size={18} />
              {deleteMutation.isPending ? '삭제 중...' : '삭제'}
            </S.DeleteButton>
          </S.ActionSection>
        )}
      </S.HeaderContainer>

      <S.ContentWrapper>
        <S.ThumbnailSection>
          {thumbnailError ? (
            <S.FallbackThumbnail>
              <ImageIcon size={48} />
              <span>이미지를 불러올 수 없습니다</span>
            </S.FallbackThumbnail>
          ) : (
            <S.ThumbnailImage
              src={thesis.thesisImage || DEFAULT_THUMBNAIL}
              alt="논문 썸네일"
              onError={handleImageError}
            />
          )}
        </S.ThumbnailSection>

        <S.ContentSection>
          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>
                <Book size={18} />
                저널
              </S.InfoLabel>
              <S.InfoValue>{thesis.journal}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>
                <Calendar size={18} />
                발행일
              </S.InfoLabel>
              <S.InfoValue>{thesis.publicationDate}</S.InfoValue>
            </S.InfoItem>

            {thesis.issn && (
              <S.InfoItem>
                <S.InfoLabel>
                  <Hash size={18} />
                  ISSN
                </S.InfoLabel>
                <S.InfoValue>{thesis.issn}</S.InfoValue>
              </S.InfoItem>
            )}
          </S.InfoGrid>

          {(thesis.publicationCollection ||
            thesis.publicationIssue ||
            thesis.publicationPage) && (
            <S.PublicationInfo>
              {`Vol. ${thesis.publicationCollection || '-'}${
                thesis.publicationIssue
                  ? `, No. ${thesis.publicationIssue}`
                  : ''
              }${thesis.publicationPage ? `, pp. ${thesis.publicationPage}` : ''}`}
            </S.PublicationInfo>
          )}

          {thesis.link && (
            <S.ExternalLinkButton
              href={thesis.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="논문 원문 보기"
            >
              <ExternalLink size={18} />
              논문 원문 보기
            </S.ExternalLinkButton>
          )}
        </S.ContentSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ThesisDetail;
