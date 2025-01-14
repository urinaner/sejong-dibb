import React, { useState, useCallback, useContext } from 'react';
import { Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as S from './FacultyStyle';
import { useProfessors } from '../../../hooks/queries/useProfessor';
import ProfessorCard from './ProfessorCard';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../../common/Button/Button';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Pagination from '../../../common/Pagination/Pagination';

const ITEMS_PER_PAGE = 10;
const DEFAULT_PROFILE_IMAGE = '/professor_example.jpg';

const Professor = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const isAuthenticated = auth?.isAuthenticated ?? false;

  const { data, isLoading, isError, error } = useProfessors({
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (data && typeof data.totalPage === 'number') {
        const adjustedPage = newPage - 1; // 1-based to 0-based
        if (adjustedPage >= 0 && adjustedPage < data.totalPage) {
          setCurrentPage(adjustedPage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    [data],
  );

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
    },
    [],
  );

  const handleAddProfessor = useCallback(() => {
    navigate('/about/faculty/create');
  }, [navigate]);

  const handleEditProfessor = useCallback(
    (id: number) => {
      navigate(`/about/faculty/edit/${id}`);
    },
    [navigate],
  );

  const renderProfessorList = () => {
    return data?.data.map((professor) => (
      <S.ProfessorCardWrapper key={professor.id}>
        <ProfessorCard
          professor={professor}
          onImageError={handleImageError}
          defaultImage={DEFAULT_PROFILE_IMAGE}
        />
        {isAuthenticated && (
          <S.EditButtonContainer>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleEditProfessor(professor.id)}
            >
              <Edit size={14} style={{ marginRight: '4px' }} />
              수정
            </Button>
          </S.EditButtonContainer>
        )}
      </S.ProfessorCardWrapper>
    ));
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner text="정보를 불러오는 중" />;
    }

    if (isError) {
      return (
        <S.ErrorContainer>
          {error instanceof Error
            ? error.message
            : '교수진 데이터를 불러오는데 실패했습니다.'}
        </S.ErrorContainer>
      );
    }

    if (!data?.data || data.data.length === 0) {
      return (
        <S.EmptyStateContainer>
          등록된 교수진 정보가 없습니다.
        </S.EmptyStateContainer>
      );
    }

    return (
      <>
        <S.ProfessorList>{renderProfessorList()}</S.ProfessorList>
        <Pagination
          totalPages={data?.totalPage ?? 0}
          currentPage={currentPage + 1}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Title>교수진 소개</S.Title>
        {isAuthenticated && (
          <S.ActionButtons>
            <Button variant="primary" onClick={handleAddProfessor}>
              <Plus size={18} style={{ marginRight: '4px' }} />
              교수 추가
            </Button>
          </S.ActionButtons>
        )}
      </S.HeaderContainer>
      {renderContent()}
    </S.Container>
  );
};

export default Professor;
