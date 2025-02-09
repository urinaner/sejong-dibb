import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Plus, Calendar, Book, User, Hash } from 'lucide-react';
import * as S from './ThesisStyle';
import { useThesisList } from '../../../hooks/queries/useThesis';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Pagination from '../../../common/Pagination/Pagination';

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
      placeholderData: (keepPreviousData) => keepPreviousData,
      refetchInterval: 5 * 60 * 1000,
    },
  );

  const handlePageChange = (newPage: number) => {
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

      <S.ThesisList>
        {theses.length > 0 ? (
          theses.map((thesis) => (
            <S.ThesisCard key={thesis.id}>
              <S.ThesisImageWrapper>
                <S.ThesisThumbnail
                  src={thesis.thesisImage || '/paperImage.png'}
                  alt="논문 썸네일"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/paperImage.png';
                  }}
                />
              </S.ThesisImageWrapper>

              <S.ThesisContent>
                <S.ThesisTitle
                  onClick={() => navigate(`/news/thesis/${thesis.id}`)}
                >
                  {thesis.title}
                </S.ThesisTitle>

                <S.ThesisMetadata>
                  <S.MetadataItem>
                    <User size={16} />
                    <span>{thesis.author}</span>
                  </S.MetadataItem>

                  <S.MetadataItem>
                    <Book size={16} />
                    <span>{thesis.journal}</span>
                  </S.MetadataItem>

                  <S.MetadataItem>
                    <Calendar size={16} />
                    <span>{formatDate(thesis.publicationDate)}</span>
                  </S.MetadataItem>

                  {thesis.publicationCollection && (
                    <S.MetadataItem>
                      <Hash size={16} />
                      <span>
                        {`${thesis.publicationCollection}${
                          thesis.publicationIssue
                            ? `, No. ${thesis.publicationIssue}`
                            : ''
                        }${
                          thesis.publicationPage
                            ? `, pp. ${thesis.publicationPage}`
                            : ''
                        }`}
                      </span>
                    </S.MetadataItem>
                  )}
                </S.ThesisMetadata>
              </S.ThesisContent>
            </S.ThesisCard>
          ))
        ) : (
          <S.EmptyMessage>등록된 논문이 없습니다.</S.EmptyMessage>
        )}
      </S.ThesisList>

      {totalPages > 1 && (
        <S.PaginationWrapper>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage + 1}
            onPageChange={handlePageChange}
          />
        </S.PaginationWrapper>
      )}
    </S.Container>
  );
};

export default ThesisList;
