import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './ThesisStyle';

interface ThesisItem {
  id: number;
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
}

const ThesisList: React.FC = () => {
  const [theses, setTheses] = useState<ThesisItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTheses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        apiEndpoints.thesis.listWithPage(page - 1, 10),
      );
      setTheses(response.data.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      setError('논문 목록을 불러오는데 실패했습니다.');
      console.error('Failed to fetch theses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, [page]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    fetchTheses();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <S.Container>
      <S.TopSection>
        <S.HeaderSection>
          <S.Title>연구 논문</S.Title>
          <S.Description>
            세종대학교 바이오융합공학과 연구 논문 게시판입니다.
          </S.Description>
        </S.HeaderSection>

        <S.SearchContainer onSubmit={handleSearch}>
          <S.SearchInput
            type="text"
            placeholder="논문 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <S.SearchButton type="submit">
            <Search size={20} />
          </S.SearchButton>
        </S.SearchContainer>
      </S.TopSection>

      {error ? (
        <S.ErrorMessage>{error}</S.ErrorMessage>
      ) : loading ? (
        <S.LoadingMessage>논문 목록을 불러오는 중입니다...</S.LoadingMessage>
      ) : (
        <S.ThesisList>
          {theses.map((thesis) => (
            <S.ThesisItem key={thesis.id}>
              <S.ThesisThumbnail>
                <img
                  src="/thesis.svg"
                  alt="논문 썸네일"
                  onError={(e) => {
                    e.currentTarget.src = '/thesis.svg';
                  }}
                />
              </S.ThesisThumbnail>
              <S.ThesisContent>
                <S.ThesisTitle>{thesis.content}</S.ThesisTitle>
                <S.ThesisInfo>
                  <S.InfoItem>
                    <S.Label>저자</S.Label>
                    <S.Value>{thesis.author}</S.Value>
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.Label>저널명</S.Label>
                    <S.Value>{thesis.journal}</S.Value>
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.Label>발표일</S.Label>
                    <S.Value>{formatDate(thesis.publicationDate)}</S.Value>
                  </S.InfoItem>
                </S.ThesisInfo>
              </S.ThesisContent>
            </S.ThesisItem>
          ))}
        </S.ThesisList>
      )}

      {!loading && totalPages > 1 && (
        <S.Pagination>
          <S.PageButton onClick={() => setPage(1)} disabled={page === 1}>
            처음
          </S.PageButton>
          <S.PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
            이전
          </S.PageButton>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <S.PageButton
                key={pageNum}
                onClick={() => setPage(pageNum)}
                $isActive={page === pageNum}
              >
                {pageNum}
              </S.PageButton>
            );
          })}
          <S.PageButton
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            다음
          </S.PageButton>
          <S.PageButton
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            마지막
          </S.PageButton>
        </S.Pagination>
      )}
    </S.Container>
  );
};

export default ThesisList;
