import React, { useState, useCallback } from 'react';
import useAuth from '../../../hooks/useAuth';
import {
  useThesisList,
  useSearchThesis,
  ThesisSearchParams,
} from '../../../hooks/queries/useThesis';
import ThesisSearchBoard from './ThesisSearchBoard';
import Container from '../../../styles/Container';

const ThesisList: React.FC = () => {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState(1); // 1부터 시작
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const pageSize = 10;

  // 일반 논문 목록 조회
  const {
    data: thesesData,
    isLoading: isListLoading,
    error: listError,
  } = useThesisList(
    {
      page: currentPage - 1, // API 요청시 0부터 시작하는 페이지로 변환
      size: pageSize,
    },
    {
      enabled: !isSearching,
    },
  );

  // 검색 파라미터
  const searchParams: ThesisSearchParams = {
    keyword: searchKeyword,
    page: currentPage - 1, // 백엔드 페이징은 0부터 시작
    size: pageSize,
  };

  // 검색 결과 조회
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchThesis(searchParams, {
    enabled: isSearching && !!searchKeyword,
  });

  // 실제 화면에 표시할 데이터
  const displayData = isSearching ? searchResults : thesesData;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const error = isSearching ? searchError : listError;

  // 검색 처리 함수
  const handleSearch = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
    if (keyword) {
      setIsSearching(true);
      setCurrentPage(1); // 검색 시 첫 페이지로 이동
    } else {
      handleClearSearch();
    }
  }, []);

  // 검색 초기화 함수
  const handleClearSearch = useCallback(() => {
    setSearchKeyword('');
    setIsSearching(false);
    setCurrentPage(1);
  }, []);

  // 페이지 변경 처리
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, []);

  return (
    <Container>
      <ThesisSearchBoard
        title="논문"
        items={displayData?.data || []}
        isLoading={isLoading}
        error={error}
        totalPages={displayData?.totalPage || 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        searchKeyword={searchKeyword}
        isSearching={isSearching}
        onClearSearch={handleClearSearch}
        emptyMessage="등록된 논문이 없습니다."
        isAuthenticated={auth?.isAuthenticated}
        formatDate={formatDate}
      />
    </Container>
  );
};

export default ThesisList;
