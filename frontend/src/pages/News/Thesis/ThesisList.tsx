import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Plus } from 'lucide-react';
import * as S from './ThesisStyle';
import { useThesisList } from '../../../hooks/queries/useThesis';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const ThesisList: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const {
    data: thesesData,
    isLoading,
    error,
  } = useThesisList(
    {
      page: currentPage,
      size: pageSize,
    },
    {
      // 데이터를 가져오는 동안 이전 데이터 유지
      placeholderData: (keepPreviousData) => keepPreviousData,
      // 페이지가 백그라운드에 있을 때도 5분마다 갱신
      refetchInterval: 5 * 60 * 1000,
    },
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (thesesData?.totalPage ?? 0)) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <S.Container>
        <LoadingSpinner text="논문 목록을 불러오는 중입니다..." />
      </S.Container>
    );
  }

  if (error) {
    return <S.ErrorMessage>{error.message}</S.ErrorMessage>;
  }

  const theses = thesesData?.data ?? [];
  const totalPages = thesesData?.totalPage ?? 0;

  return (
    <S.Container>
      <S.Header>
        <S.Title>논문</S.Title>
        {auth?.isAuthenticated && (
          <S.ActionButtons>
            <S.CreateButton onClick={() => navigate('/news/thesis/create')}>
              <Plus size={18} />
              논문 등록
            </S.CreateButton>
          </S.ActionButtons>
        )}
      </S.Header>

      <S.ThesisTable>
        <thead>
          <S.Tr>
            <S.Th>번호</S.Th>
            <S.Th></S.Th>
            <S.Th>논문 제목</S.Th>
            <S.Th>저자</S.Th>
            <S.Th>저널</S.Th>
            <S.Th>발행일</S.Th>
            <S.Th>출판 정보</S.Th>
          </S.Tr>
        </thead>
        <tbody>
          {theses.length > 0 ? (
            theses.map((thesis, index) => (
              <tr key={thesis.id}>
                <S.Td>{index + 1}</S.Td>
                <S.Td>
                  <S.ThesisThumbnail
                    src={thesis.thesisImage || '/paperImage.png'}
                    alt="논문 썸네일"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/paperImage.png';
                    }}
                  />
                </S.Td>
                <S.TitleTd
                  onClick={() => navigate(`/news/thesis/${thesis.id}`)}
                >
                  {thesis.content}
                </S.TitleTd>
                <S.Td style={{ wordWrap: 'break-word' }}>{thesis.author}</S.Td>
                <S.Td>{thesis.journal}</S.Td>
                <S.Td>{formatDate(thesis.publicationDate)}</S.Td>
                <S.Td>
                  {thesis.publicationCollection &&
                    `${thesis.publicationCollection}, ${
                      thesis.publicationIssue
                        ? `No. ${thesis.publicationIssue}`
                        : ''
                    } ${thesis.publicationPage ? `pp. ${thesis.publicationPage}` : ''}`}
                </S.Td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>등록된 논문이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </S.ThesisTable>

      {totalPages > 1 && (
        <S.Pagination>
          <S.PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </S.PageButton>
          <span>
            {currentPage + 1} / {totalPages}
          </span>
          <S.PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </S.PageButton>
        </S.Pagination>
      )}
    </S.Container>
  );
};

export default ThesisList;
