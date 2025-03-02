import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../constants/colors';
import { AuthContext } from '../../../../context/AuthContext';
import { Modal, useModal } from '../../../../components/Modal';
import Button from '../../../../common/Button/Button';
import PageContainer from '../components/common/PageContainer/PageContainer';
import ProfileSection from '../components/ProfileSection';
import Publications from '../components/Tabs/Publications';
import {
  useProfessorDetail,
  useDeleteProfessor,
  getErrorMessage,
} from '../../../../hooks/queries/useProfessor';

// 스타일 컴포넌트
const PublicationsContainer = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 2px solid ${(props) => props.theme.colors.grey[200]};

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

const PublicationsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
  }
`;

const ProfessorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();

  const professorId = id ? parseInt(id) : 0;
  const { data: professor, isLoading, error } = useProfessorDetail(professorId);
  const deleteMutation = useDeleteProfessor();

  const isAuthenticated = auth?.isAuthenticated ?? false;

  const handleEdit = () => {
    navigate(`/about/faculty/edit/${id}`);
  };

  const handleNavigateToList = () => {
    navigate('/about/faculty');
  };

  const showConfirmModal = () => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          교수 정보 삭제
        </Modal.Header>
        <Modal.Content>
          <p className="text-center">
            정말 이 교수 정보를 삭제하시겠습니까?
            <br />이 작업은 되돌릴 수 없습니다.
          </p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <Modal.DeleteButton
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </Modal.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(professorId);
      openModal(
        <>
          <Modal.Header>
            <CheckCircle size={48} color="#38A169" />
            삭제 완료
          </Modal.Header>
          <Modal.Content>
            <p>교수 정보가 성공적으로 삭제되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton
              onClick={() => navigate('/about/faculty', { replace: true })}
            />
          </Modal.Footer>
        </>,
      );
    } catch (error) {
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            삭제 실패
          </Modal.Header>
          <Modal.Content>
            <p>{getErrorMessage(error)}</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    }
  };

  // 액션 버튼 렌더링 (관리자만 볼 수 있음)
  const renderActions = () => {
    if (!isAuthenticated) return null;

    return (
      <>
        <Button variant="secondary" onClick={handleEdit}>
          <Edit size={18} style={{ marginRight: '4px' }} />
          수정
        </Button>
        <Button
          variant="danger"
          onClick={showConfirmModal}
          disabled={deleteMutation.isPending}
        >
          <Trash2 size={18} style={{ marginRight: '4px' }} />
          {deleteMutation.isPending ? '삭제 중...' : '삭제'}
        </Button>
      </>
    );
  };

  return (
    <PageContainer
      title={professor?.name}
      subtitle={professor?.position}
      actions={renderActions()}
      isLoading={isLoading}
      isError={!!error}
      errorMessage={getErrorMessage(error)}
      hasBackButton
      onBack={handleNavigateToList}
      backButtonText="교수진 목록으로"
    >
      {professor && (
        <>
          <ProfileSection
            professor={professor}
            onImageError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/professor_example.jpg';
            }}
            defaultImage="/professor_example.jpg"
          />

          <PublicationsContainer>
            <PublicationsTitle>논문 목록</PublicationsTitle>
            <Publications professorId={professor.id} />
          </PublicationsContainer>
        </>
      )}
    </PageContainer>
  );
};

export default ProfessorDetail;
