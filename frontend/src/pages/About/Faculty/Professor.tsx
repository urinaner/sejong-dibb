import React, { useState, useCallback, useContext } from 'react';
import { ChevronLeft, ChevronRight, Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as S from './FacultyStyle';
import { useProfessors } from '../../../hooks/queries/useProfessor';
import ProfessorCard from './ProfessorCard';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../../common/Button/Button';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const ITEMS_PER_PAGE = 10;
const DEFAULT_PROFILE_IMAGE = '/professor_example.jpg';

const Professor = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const isAuthenticated = auth?.isAuthenticated ?? false;

  // React Query로 데이터 페칭
  const { data, isLoading, isError, error } = useProfessors({
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 0 && newPage < (data?.totalPage ?? 0)) {
        // totalPages -> totalPage
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [data?.totalPage], // totalPages -> totalPage
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
  const renderPagination = () => {
    if (!data || data.totalPage <= 1) return null; // totalPages -> totalPage

    return (
      <S.PaginationWrapper>
        <S.PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="이전 페이지"
        >
          <ChevronLeft />
        </S.PaginationButton>

        <S.PageNumber>
          {currentPage + 1} / {data.totalPage} {/* totalPages -> totalPage */}
        </S.PageNumber>

        <S.PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data.totalPage - 1}
          aria-label="다음 페이지"
        >
          <ChevronRight />
        </S.PaginationButton>
      </S.PaginationWrapper>
    );
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
      // data.content -> data.data
      return (
        <S.EmptyStateContainer>
          등록된 교수진 정보가 없습니다.
        </S.EmptyStateContainer>
      );
    }

    return (
      <>
        <S.ProfessorList>{renderProfessorList()}</S.ProfessorList>
        {renderPagination()}
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
