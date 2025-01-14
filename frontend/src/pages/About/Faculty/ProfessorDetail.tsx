import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { AuthContext } from '../../../context/AuthContext';
import { Modal, useModal } from '../../../components/Modal';
import Button from '../../../common/Button/Button';
import * as S from './ProfessorDetailStyle';
import ProfileSection from './ProfileSection';
import Publications from './tabs/Publications';

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
  const { openModal } = useModal();

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

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
          <Modal.DeleteButton onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Modal.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(apiEndpoints.professor.delete(Number(id)));

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
    } catch (err) {
      console.error('Error deleting professor:', err);
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            삭제 실패
          </Modal.Header>
          <Modal.Content>
            <p>교수 정보 삭제에 실패했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    } finally {
      setIsDeleting(false);
    }
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
              onClick={showConfirmModal}
              disabled={isDeleting}
            >
              <Trash2 size={18} />
              {isDeleting ? '삭제 중...' : '삭제'}
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
