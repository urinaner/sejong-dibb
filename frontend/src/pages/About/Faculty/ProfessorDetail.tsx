import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../../common/Button/Button';
import { Modal } from '../../../components/Modal';
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

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', content: '' });

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

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await axios.delete(apiEndpoints.professor.delete(Number(id)));
      setModalMessage({
        title: '삭제 완료',
        content: '교수 정보가 성공적으로 삭제되었습니다.',
      });
      setIsConfirmModalOpen(false);
      setIsResultModalOpen(true);
    } catch (err) {
      console.error('Error deleting professor:', err);
      setModalMessage({
        title: '삭제 실패',
        content: '교수 정보 삭제에 실패했습니다.',
      });
      setIsConfirmModalOpen(false);
      setIsResultModalOpen(true);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleResultModalClose = () => {
    setIsResultModalOpen(false);
    if (modalMessage.title === '삭제 완료') {
      navigate('/about/faculty', { replace: true });
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
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isDeleteLoading}
            >
              <Trash2 size={18} />
              {isDeleteLoading ? '삭제 중...' : '삭제'}
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

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <Modal.Header>
          <h2 className="text-xl font-semibold">교수 정보 삭제</h2>
          <Modal.CloseButton onClick={() => setIsConfirmModalOpen(false)} />
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle size={48} className="text-red-500" />
            <p className="text-center">
              정말 이 교수 정보를 삭제하시겠습니까?
              <br />이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button
            variant="ghost"
            onClick={() => setIsConfirmModalOpen(false)}
            disabled={isDeleteLoading}
          >
            취소
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? '삭제 중...' : '삭제'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 결과 알림 모달 */}
      <Modal isOpen={isResultModalOpen} onClose={handleResultModalClose}>
        <Modal.Header>
          <h2 className="text-xl font-semibold">{modalMessage.title}</h2>
          <Modal.CloseButton onClick={handleResultModalClose} />
        </Modal.Header>
        <Modal.Content>
          <p>{modalMessage.content}</p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" onClick={handleResultModalClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </S.Container>
  );
};

export default ProfessorDetail;
