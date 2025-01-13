import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ChevronLeft, ChevronRight, Edit, Plus } from 'lucide-react';
import * as S from './FacultyStyle';
import { apiEndpoints } from '../../../config/apiConfig';
import ProfessorCard from './ProfessorCard';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const ITEMS_PER_PAGE = 10;
const DEFAULT_PROFILE_IMAGE = '/professor_example.jpg';

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

interface ApiResponse {
  message: string;
  page: number;
  totalPage: number;
  data: Professor[];
}

const Professor = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAuthenticated = auth?.isAuthenticated ?? false;

  const fetchProfessors = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        apiEndpoints.professor.listWithPage(page, ITEMS_PER_PAGE),
      );

      if (response.data?.data) {
        setProfessors(response.data.data);
        setTotalPages(response.data.totalPage);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      let errorMessage = '교수진 데이터를 불러오는데 실패했습니다.';
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        errorMessage = '데이터가 존재하지 않습니다.';
      }
      setError(errorMessage);
      console.error('Error fetching professors:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [totalPages],
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

  useEffect(() => {
    fetchProfessors(currentPage);
  }, [currentPage, fetchProfessors]);

  const renderProfessorList = () => {
    return professors.map((professor) => (
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
    if (totalPages <= 1) return null;

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
          {currentPage + 1} / {totalPages}
        </S.PageNumber>

        <S.PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          aria-label="다음 페이지"
        >
          <ChevronRight />
        </S.PaginationButton>
      </S.PaginationWrapper>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner text={'정보를 불러오는 중'} />;
    }

    if (error) {
      return <S.ErrorContainer>{error}</S.ErrorContainer>;
    }

    if (professors.length === 0) {
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
