import React, { useState, useEffect, useMemo } from 'react';
import {
  AlertTriangle,
  Search,
  ExternalLink,
  FileText,
  Calendar,
  BookOpen,
  Hash,
} from 'lucide-react';
import axios from 'axios';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../../constants/colors';
import { apiEndpoints } from '../../../../../config/apiConfig';
import { ThesisResponse } from '../../types';

// 스타일 컴포넌트
const PublicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.grey[500]};
    pointer-events: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}15;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey[400]};
  }
`;

const FilterSelect = styled.select`
  min-width: 140px;
  padding: 0.75rem 2rem 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}15;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ThesisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ThesisCard = styled.article`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 2px 8px rgba(163, 20, 50, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ThesisTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 6px;
  background: white;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.grey[50]};
  border-radius: 6px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};

  svg {
    margin-top: 0.25rem;
    color: ${SEJONG_COLORS.CRIMSON_RED};
    opacity: 0.8;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 0.5rem;
  }
`;

const MetaLabel = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey[500]};
`;

const MetaValue = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
`;

const EmptyMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.grey[500]};
  background: ${(props) => props.theme.colors.grey[50]};
  border-radius: 8px;
  border: 1px dashed ${(props) => props.theme.colors.grey[300]};
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    font-size: 0.9rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey[200]};

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    gap: 0.75rem;
  }
`;

const PageButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? props.theme.colors.grey[200]
        : SEJONG_COLORS.CRIMSON_RED};
  border-radius: 6px;
  background: white;
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey[400] : SEJONG_COLORS.CRIMSON_RED};
  font-size: 0.9rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:not(:disabled):hover {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const PageInfo = styled.span`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.grey[500]};
  min-width: 80px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-width: 60px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${(props) => props.theme.colors.grey[500]};

  @media (max-width: 768px) {
    min-height: 150px;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #feb2b2;
  text-align: center;
  justify-content: center;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  }
`;

// 컴포넌트 타입 정의
interface PublicationsProps {
  professorId: number;
}

const ITEMS_PER_PAGE = 10;

const Publications: React.FC<PublicationsProps> = ({ professorId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [theses, setTheses] = useState<ThesisResponse['data']>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 논문 데이터 가져오기
  const fetchTheses = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get<ThesisResponse>(
        apiEndpoints.professor.thesis.listWithPage(page, ITEMS_PER_PAGE),
      );

      const filteredTheses = response.data.data.filter(
        (thesis) => thesis.professorId === professorId,
      );

      setTheses(filteredTheses);
      setTotalPages(response.data.totalPage);
    } catch (err) {
      setError('논문 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching theses:', err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchTheses(currentPage);
  }, [currentPage, professorId]);

  // 연도 옵션 메모이제이션
  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(
        theses.map((thesis) =>
          new Date(thesis.publicationDate).getFullYear().toString(),
        ),
      ),
    ).sort((a, b) => parseInt(b) - parseInt(a));
    return ['all', ...uniqueYears];
  }, [theses]);

  // 필터링된 논문 메모이제이션
  const filteredTheses = useMemo(() => {
    return theses
      .filter((thesis) => {
        const matchesSearch =
          thesis.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thesis.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          thesis.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesYear =
          selectedYear === 'all' ||
          new Date(thesis.publicationDate).getFullYear().toString() ===
            selectedYear;

        return matchesSearch && matchesYear;
      })
      .sort(
        (a, b) =>
          new Date(b.publicationDate).getTime() -
          new Date(a.publicationDate).getTime(),
      );
  }, [theses, searchTerm, selectedYear]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
    });
  };

  if (loading) {
    return <LoadingWrapper>데이터를 불러오는 중입니다...</LoadingWrapper>;
  }

  if (error) {
    return (
      <ErrorMessage>
        <AlertTriangle size={18} />
        {error}
      </ErrorMessage>
    );
  }

  return (
    <PublicationsContainer>
      <FilterSection>
        <SearchWrapper>
          <Search size={18} />
          <SearchInput
            type="text"
            placeholder="저자, 저널명, 내용으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <FilterSelect
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">전체 연도</option>
          {years.slice(1).map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      <ThesisList>
        {filteredTheses.length === 0 ? (
          <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
        ) : (
          filteredTheses.map((thesis, index) => (
            <ThesisCard key={index}>
              <ThesisTitle>
                <div>
                  <FileText size={18} />
                  {thesis.content}
                </div>
                <LinkButton
                  onClick={() =>
                    window.open(thesis.link, '_blank', 'noopener noreferrer')
                  }
                  aria-label="논문 링크 열기"
                >
                  <ExternalLink size={16} />
                  링크
                </LinkButton>
              </ThesisTitle>

              <MetaGrid>
                <MetaItem>
                  <Calendar size={16} />
                  <div>
                    <MetaLabel>출판일</MetaLabel>
                    <br />
                    <MetaValue>{formatDate(thesis.publicationDate)}</MetaValue>
                  </div>
                </MetaItem>

                <MetaItem>
                  <BookOpen size={16} />
                  <div>
                    <MetaLabel>저널</MetaLabel>
                    <br />
                    <MetaValue>{thesis.journal}</MetaValue>
                  </div>
                </MetaItem>

                <MetaItem>
                  <Hash size={16} />
                  <div>
                    <MetaLabel>출판 정보</MetaLabel>
                    <br />
                    <MetaValue>
                      {thesis.publicationCollection ||
                      thesis.publicationIssue ||
                      thesis.publicationPage
                        ? `${thesis.publicationCollection ? `Vol. ${thesis.publicationCollection}` : ''}${
                            thesis.publicationIssue
                              ? `, No. ${thesis.publicationIssue}`
                              : ''
                          }${thesis.publicationPage ? `, pp. ${thesis.publicationPage}` : ''}`
                        : '-'}
                    </MetaValue>
                  </div>
                </MetaItem>
              </MetaGrid>
            </ThesisCard>
          ))
        )}
      </ThesisList>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </PageButton>
          <PageInfo>
            {currentPage + 1} / {totalPages}
          </PageInfo>
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </PageButton>
        </Pagination>
      )}
    </PublicationsContainer>
  );
};

export default Publications;
