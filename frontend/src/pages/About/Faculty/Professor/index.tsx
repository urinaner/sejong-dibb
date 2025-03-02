import React, { useState, useCallback, useContext } from 'react';
import { Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../constants/colors';
import { useProfessors } from '../../../../hooks/queries/useProfessor';
import ProfessorCard from '../components/common/ProfessorCard';
import { AuthContext } from '../../../../context/AuthContext';
import Button from '../../../../common/Button/Button';
import Pagination from '../../../../common/Pagination/Pagination';
import PageContainer from '../components/common/PageContainer/PageContainer';

const DEFAULT_PROFILE_IMAGE = '/professor_example.jpg';
const ITEMS_PER_PAGE = 10;

// 스타일 컴포넌트
const ProfessorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ProfessorCardWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);

    @media (min-width: 1025px) {
      button {
        opacity: 1;
      }
    }
  }
`;

const EditButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 10;

  @media (max-width: 768px) {
    opacity: 1;
    position: relative;
    top: auto;
    right: auto;
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem 1rem;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: ${(props) => props.theme.colors.grey[50]};
  color: ${(props) => props.theme.colors.grey[500]};
  border-radius: 8px;
  font-size: 1.1rem;
  border: 1px dashed ${(props) => props.theme.colors.grey[300]};
  margin: 2rem 0;

  @media (max-width: 768px) {
    min-height: 150px;
    font-size: 0.9rem;
    margin: 1.5rem 0;
  }
`;

const Professor: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const isAuthenticated = auth?.isAuthenticated ?? false;

  // 교수 목록 데이터 가져오기
  const { data, isLoading, isError, error } = useProfessors({
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });

  // 페이지 변경 핸들러
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

  // 이미지 오류 핸들러
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
    },
    [],
  );

  // 교수 추가 페이지로 이동
  const handleAddProfessor = useCallback(() => {
    navigate('/about/faculty/create');
  }, [navigate]);

  // 교수 편집 페이지로 이동
  const handleEditProfessor = useCallback(
    (id: number) => {
      navigate(`/about/faculty/edit/${id}`);
    },
    [navigate],
  );

  // 교수 목록 렌더링
  const renderProfessorList = () => {
    return data?.data.map((professor) => (
      <ProfessorCardWrapper key={professor.id}>
        <ProfessorCard
          professor={professor}
          onImageError={handleImageError}
          defaultImage={DEFAULT_PROFILE_IMAGE}
        />
        {isAuthenticated && (
          <EditButtonContainer>
            <Button
              variant="secondary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleEditProfessor(professor.id);
              }}
            >
              <Edit size={14} style={{ marginRight: '4px' }} />
              수정
            </Button>
          </EditButtonContainer>
        )}
      </ProfessorCardWrapper>
    ));
  };

  // 교수 목록이 없을 때 렌더링
  const renderEmptyState = () => (
    <EmptyStateContainer>등록된 교수진 정보가 없습니다.</EmptyStateContainer>
  );

  // 액션 버튼 (관리자만 보임)
  const renderActions = () => {
    if (!isAuthenticated) return null;

    return (
      <Button variant="primary" onClick={handleAddProfessor}>
        <Plus size={18} style={{ marginRight: '4px' }} />
        교수 추가
      </Button>
    );
  };

  return (
    <PageContainer
      title="교수진 소개"
      actions={renderActions()}
      isLoading={isLoading}
      isError={isError}
      errorMessage={
        error instanceof Error
          ? error.message
          : '교수진 데이터를 불러오는데 실패했습니다.'
      }
    >
      {!isLoading && !isError && (
        <>
          {data?.data && data.data.length > 0 ? (
            <ProfessorList>{renderProfessorList()}</ProfessorList>
          ) : (
            renderEmptyState()
          )}

          {data && data.totalPage > 1 && (
            <Pagination
              totalPages={data.totalPage}
              currentPage={currentPage + 1}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default Professor;
