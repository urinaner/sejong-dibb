import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { Modal, useModal } from '../../../components/Modal';
import Button from '../../../common/Button/Button';
import * as S from './ProfessorDetailStyle';
import ProfileSection from './ProfileSection';
import Publications from './tabs/Publications';
import {
  useProfessorDetail,
  useDeleteProfessor,
  getErrorMessage,
} from '../../../hooks/queries/useProfessor';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const ProfessorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();

  const professorId = id ? parseInt(id) : 0;
  const {
    data: professorResponse,
    isLoading,
    error,
  } = useProfessorDetail(professorId);
  const deleteMutation = useDeleteProfessor();

  const isAuthenticated = auth?.isAuthenticated ?? false;

  const handleEdit = () => {
    navigate(`/about/faculty/edit/${id}`);
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

  if (isLoading) {
    return (
      <LoadingSpinner text={'데이터를 불러오는 중입니다...'}></LoadingSpinner>
    );
  }

  if (error) {
    return (
      <S.ErrorContainer>
        <AlertTriangle size={24} />
        {getErrorMessage(error)}
      </S.ErrorContainer>
    );
  }

  if (!professorResponse) {
    return (
      <S.ErrorContainer>
        <AlertTriangle size={24} />
        교수 정보를 찾을 수 없습니다.
      </S.ErrorContainer>
    );
  }

  const professor = professorResponse;

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.NavigationSection>
          <Button
            variant="ghost"
            size="small"
            onClick={() => navigate('/about/faculty')}
          >
            <ChevronLeft size={18} />
            목록으로
          </Button>
        </S.NavigationSection>

        <S.TitleSection>
          <S.Title>{professor.name}</S.Title>
          <S.Subtitle>{professor.position}</S.Subtitle>
        </S.TitleSection>

        {isAuthenticated && (
          <S.ActionSection>
            <Button variant="secondary" onClick={handleEdit}>
              <Edit size={18} />
              수정
            </Button>
            <Button
              variant="danger"
              onClick={showConfirmModal}
              disabled={deleteMutation.isPending}
            >
              <Trash2 size={18} />
              {deleteMutation.isPending ? '삭제 중...' : '삭제'}
            </Button>
          </S.ActionSection>
        )}
      </S.HeaderContainer>

      <ProfileSection
        professor={professor}
        onImageError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = '/professor_example.jpg';
        }}
        defaultImage="/professor_example.jpg"
      />

      <S.PublicationsContainer>
        <S.PublicationsTitle>논문 목록</S.PublicationsTitle>
        <Publications professorId={professor.id} />
      </S.PublicationsContainer>
    </S.Container>
  );
};

export default ProfessorDetail;
