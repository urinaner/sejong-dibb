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
import { apiEndpoints } from '../../../../config/apiConfig';
import * as S from './PublicationsStyle';

interface PublicationsProps {
  professorId: number;
}

interface Thesis {
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
  thesisImage: string;
  publicationCollection: string;
  publicationIssue: string;
  publicationPage: string;
  issn: string;
  professorId: number;
}

interface ThesisResponse {
  message: string;
  page: number;
  totalPage: number;
  data: Thesis[];
}

const ITEMS_PER_PAGE = 10;

const Publications: React.FC<PublicationsProps> = ({ professorId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

  useEffect(() => {
    fetchTheses(currentPage);
  }, [currentPage, professorId]);

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

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
    });
  };

  if (loading) {
    return <S.LoadingWrapper>데이터를 불러오는 중입니다...</S.LoadingWrapper>;
  }

  if (error) {
    return (
      <S.ErrorMessage>
        <AlertTriangle size={18} />
        {error}
      </S.ErrorMessage>
    );
  }

  return (
    <S.PublicationsContainer>
      <S.FilterSection>
        <S.SearchWrapper>
          <Search size={18} />
          <S.SearchInput
            type="text"
            placeholder="저자, 저널명, 내용으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchWrapper>

        <S.FilterSelect
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">전체 연도</option>
          {years.slice(1).map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </S.FilterSelect>
      </S.FilterSection>

      <S.ThesisList>
        {filteredTheses.length === 0 ? (
          <S.EmptyMessage>검색 결과가 없습니다.</S.EmptyMessage>
        ) : (
          filteredTheses.map((thesis, index) => (
            <S.ThesisCard key={index}>
              <S.ThesisTitle>
                <div>
                  <FileText size={18} />
                  {thesis.content}
                </div>
                <S.LinkButton
                  onClick={() =>
                    window.open(thesis.link, '_blank', 'noopener noreferrer')
                  }
                  aria-label="논문 링크 열기"
                >
                  <ExternalLink size={16} />
                  링크
                </S.LinkButton>
              </S.ThesisTitle>

              <S.MetaGrid>
                <S.MetaItem>
                  <Calendar size={16} />
                  <div>
                    <S.MetaLabel>출판일</S.MetaLabel>
                    <br />
                    <S.MetaValue>
                      {formatDate(thesis.publicationDate)}
                    </S.MetaValue>
                  </div>
                </S.MetaItem>

                <S.MetaItem>
                  <BookOpen size={16} />
                  <div>
                    <S.MetaLabel>저널</S.MetaLabel>
                    <br />
                    <S.MetaValue>{thesis.journal}</S.MetaValue>
                  </div>
                </S.MetaItem>

                <S.MetaItem>
                  <Hash size={16} />
                  <div>
                    <S.MetaLabel>출판 정보</S.MetaLabel>
                    <br />
                    <S.MetaValue>
                      {thesis.publicationCollection ||
                      thesis.publicationIssue ||
                      thesis.publicationPage
                        ? `${thesis.publicationCollection ? `Vol. ${thesis.publicationCollection}` : ''}${
                            thesis.publicationIssue
                              ? `, No. ${thesis.publicationIssue}`
                              : ''
                          }${thesis.publicationPage ? `, pp. ${thesis.publicationPage}` : ''}`
                        : '-'}
                    </S.MetaValue>
                  </div>
                </S.MetaItem>
              </S.MetaGrid>
            </S.ThesisCard>
          ))
        )}
      </S.ThesisList>

      {totalPages > 1 && (
        <S.Pagination>
          <S.PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </S.PageButton>
          <S.PageInfo>
            {currentPage + 1} / {totalPages}
          </S.PageInfo>
          <S.PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </S.PageButton>
        </S.Pagination>
      )}
    </S.PublicationsContainer>
  );
};

export default Publications;
