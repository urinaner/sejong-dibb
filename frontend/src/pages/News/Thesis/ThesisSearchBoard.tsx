import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import SearchComponent from '../../../common/SearchComponent';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Pagination from '../../../common/Pagination/Pagination';
import { SEJONG_COLORS } from '../../../constants/colors';
import { ThesisItem } from '../../../hooks/queries/useThesis';
import * as S from './ThesisStyle';

interface ThesisSearchBoardProps {
  title: string;
  items: ThesisItem[];
  isLoading: boolean;
  error: any;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch: (keyword: string) => void;
  searchKeyword?: string;
  isSearching?: boolean;
  onClearSearch?: () => void;
  emptyMessage?: string;
  isAuthenticated?: boolean;
  formatDate: (date: string) => string;
}

const ThesisSearchBoard: React.FC<ThesisSearchBoardProps> = ({
  title,
  items,
  isLoading,
  error,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
  searchKeyword = '',
  isSearching = false,
  onClearSearch,
  emptyMessage = '등록된 논문이 없습니다.',
  isAuthenticated = false,
  formatDate,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSpinner text={`${title}를 불러오는 중입니다...`} />;
  }

  if (error) {
    return (
      <S.ErrorMessage>{`${title}를 불러오는데 실패했습니다.`}</S.ErrorMessage>
    );
  }

  return (
    <Container>
      {/* 헤더 섹션: 제목 및 검색 */}
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <SearchContainer>
          <SearchComponent
            onSearch={onSearch}
            placeholder="논문 검색..."
            initialValue={searchKeyword}
            searchInProgress={isLoading}
            section="thesis"
          />
        </SearchContainer>
      </S.HeaderSection>

      {/* 액션 버튼 섹션 (글쓰기 등) */}
      {isAuthenticated && (
        <ActionSection>
          <S.CreateButton onClick={() => navigate('/news/thesis/create')}>
            <Plus size={18} />
            논문 등록
          </S.CreateButton>
        </ActionSection>
      )}

      {/* 검색 결과 정보 표시 */}
      {isSearching && searchKeyword && (
        <SearchResultInfo>
          <span>
            <strong>{searchKeyword}</strong>에 대한 검색 결과: 총{' '}
            <Count>{items.length}</Count>건
          </span>
          {onClearSearch && (
            <ClearSearchButton onClick={onClearSearch}>
              검색 초기화
            </ClearSearchButton>
          )}
        </SearchResultInfo>
      )}

      {/* 논문 리스트 */}
      {items.length > 0 ? (
        <S.ThesisList>
          {items.map((thesis) => (
            <S.ThesisCard
              key={thesis.id}
              onClick={() => navigate(`/news/thesis/${thesis.id}`)}
            >
              <S.ThesisImageWrapper>
                <S.ThesisThumbnail
                  src={thesis.thesisImage || '/paperImage.png'}
                  alt="논문 썸네일"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/paperImage.png';
                  }}
                />
              </S.ThesisImageWrapper>

              <S.ThesisContent>
                <S.ThesisTitle>{thesis.title}</S.ThesisTitle>

                <S.ThesisMetadata>
                  <S.MetadataItem>
                    <span>저자: {thesis.author}</span>
                  </S.MetadataItem>

                  <S.MetadataItem>
                    <span>저널: {thesis.journal}</span>
                  </S.MetadataItem>

                  {thesis.publicationDate && (
                    <S.MetadataItem>
                      <span>발행일: {formatDate(thesis.publicationDate)}</span>
                    </S.MetadataItem>
                  )}

                  {thesis.publicationCollection && (
                    <S.MetadataItem>
                      <span>
                        {`Vol. ${thesis.publicationCollection}${
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
          ))}
        </S.ThesisList>
      ) : (
        <S.EmptyMessage>
          {isSearching
            ? `"${searchKeyword}"에 대한 검색 결과가 없습니다.`
            : emptyMessage}
        </S.EmptyMessage>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <S.PaginationWrapper>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </S.PaginationWrapper>
      )}
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY}20;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;

const SearchResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #4a5568;

  strong {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
`;

const Count = styled.span`
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
`;

const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
`;

export default ThesisSearchBoard;
