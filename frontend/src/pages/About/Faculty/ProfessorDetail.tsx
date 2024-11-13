import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../../common/Button/Button';
import { useModalContext } from '../../../context/ModalContext';
import * as S from './ProfessorDetailStyle';
import ProfileSection from './ProfileSection';
import TabSection from './TabSection';

interface Professor {
  id: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}

const ProfessorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModalContext();

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isAuthenticated = auth?.isAuthenticated ?? false;

  const fetchProfessorData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        apiEndpoints.professor.detail(Number(id)),
      );
      setProfessor(response.data);
    } catch (err) {
      setError('교수 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching professor:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfessorData();
  }, [fetchProfessorData]);

  const handleEdit = () => {
    navigate(`/professor/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDeletion = () => {
      setDeleteLoading(true);
      axios
        .delete(apiEndpoints.professor.delete(Number(id)))
        .then(() => {
          navigate('/faculty', { replace: true });
        })
        .catch((err) => {
          setError('교수 정보 삭제에 실패했습니다.');
          console.error('Error deleting professor:', err);
        })
        .finally(() => {
          setDeleteLoading(false);
        });
    };

    openModal(
      <S.DeleteConfirmationModal>
        <AlertTriangle size={48} color="#EF4444" />
        <S.ModalTitle>교수 정보 삭제</S.ModalTitle>
        <S.ModalMessage>
          정말 이 교수 정보를 삭제하시겠습니까?
          <br />이 작업은 되돌릴 수 없습니다.
        </S.ModalMessage>
        <S.ModalButtonGroup>
          <Button variant="ghost" onClick={() => openModal(null)}>
            취소
          </Button>
          <Button
            variant="danger"
            onClick={confirmDeletion}
            isLoading={deleteLoading}
          >
            삭제
          </Button>
        </S.ModalButtonGroup>
      </S.DeleteConfirmationModal>,
    );
  };

  if (loading) {
    return (
      <S.LoadingContainer>데이터를 불러오는 중입니다...</S.LoadingContainer>
    );
  }

  if (error) {
    return (
      <S.ErrorContainer>
        <AlertTriangle size={24} />
        {error}
      </S.ErrorContainer>
    );
  }

  if (!professor) {
    return (
      <S.ErrorContainer>
        <AlertTriangle size={24} />
        교수 정보를 찾을 수 없습니다.
      </S.ErrorContainer>
    );
  }

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
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              <Trash2 size={18} />
              삭제
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

      <TabSection professorId={professor.id} />
    </S.Container>
  );
};

export default ProfessorDetail;
