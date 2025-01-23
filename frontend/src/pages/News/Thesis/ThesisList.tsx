import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Plus } from 'lucide-react';
import * as S from './ThesisStyle';
import { useThesisList } from '../../../hooks/queries/useThesis';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Pagination from '../../../common/Pagination/Pagination';

const ThesisList: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [isMobile, setIsMobile] = useState(false); // 접속 기기가 모바일인지

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
    // newPage는 1-based이므로 0-based로 변환
    const zeroBasedPage = newPage - 1;
    if (zeroBasedPage >= 0 && zeroBasedPage < (thesesData?.totalPage ?? 0)) {
      setCurrentPage(zeroBasedPage);
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

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize); // 창 크기 변경 감지
    return () => {
      window.removeEventListener('resize', handleResize); // 이벤트 리스너 정리
    };
  }, []);

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

      {isMobile ? (
        <S.ListContainer>
          {theses.length > 0 ? (
            theses.map((thesis, index) => (
              <S.Thesis
                key={thesis.id}
                onClick={() => navigate(`/news/thesis/${thesis.id}`)}
              >
                <div>{thesis.content}</div>
                <div style={{ wordWrap: 'break-word' }}>
                  <span>저자 </span>
                  {thesis.author}
                </div>
                <div>
                  <span>저널 </span>
                  {thesis.journal}
                </div>
                <div>
                  <span>발행일 </span>
                  {formatDate(thesis.publicationDate)}
                </div>
                <div>
                  <span>출판 정보 </span>
                  {thesis.publicationCollection &&
                    `${thesis.publicationCollection}, ${
                      thesis.publicationIssue
                        ? `No. ${thesis.publicationIssue}`
                        : ''
                    } ${thesis.publicationPage ? `pp. ${thesis.publicationPage}` : ''}`}
                </div>
              </S.Thesis>
            ))
          ) : (
            <div>등록된 논문이 없습니다.</div>
          )}
        </S.ListContainer>
      ) : (
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
                  <S.Td style={{ wordWrap: 'break-word' }}>
                    {thesis.author}
                  </S.Td>
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
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage + 1} // 0-based to 1-based
          onPageChange={handlePageChange} // 직접 handlePageChange 전달
        />
      )}
    </S.Container>
  );
};

export default ThesisList;
