import React, { useContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import useNotice from '../../../hooks/queries/useNotice';
import type {
  NoticeQueryParams,
  NoticeSearchParams,
} from '../../../types/api/notice';
import Container from '../../../styles/Container';
import SearchableBoard from '../../../common/SearchableBoard';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';
import { media } from '../../../styles/media';

export const CATEGORY_MAP = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};

// 정렬 필드 타입 정의
type SortField = 'createdDate' | 'viewCount' | 'title';
type SortDirection = 'ASC' | 'DESC';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date
    .toLocaleDateString('ko-KR')
    .replace(/\\. /g, '-')
    .replace('.', '');
};

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // 쿼리 파라미터 상태 관리
  const [queryParams, setQueryParams] = useState<NoticeQueryParams>({
    category: 'all',
    page: 0,
    size: 10,
    sort: 'DESC',
  });

  // 검색 관련 상태 관리
  const [keyword, setKeyword] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 공지사항 목록 조회 API 훅
  const { data, isLoading, error, refetch } =
    useNotice.useGetNoticeList(queryParams);

  // 검색 API 훅
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: searchRefetch,
  } = useNotice.useSearchNotice(
    { keyword, page: queryParams.page, size: queryParams.size },
    { enabled: isSearching && !!keyword },
  );

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback(
    (category: string) => {
      setQueryParams((prev) => ({ ...prev, category, page: 0 }));
      setIsSearching(false);
      setKeyword('');
      refetch();
    },
    [refetch],
  );

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (newPage: number) => {
      setQueryParams((prev) => ({ ...prev, page: newPage - 1 }));

      if (isSearching && keyword) {
        searchRefetch();
      } else {
        refetch();
      }
    },
    [refetch, searchRefetch, isSearching, keyword],
  );

  // 정렬 변경 핸들러 - string 타입 파라미터로 수정
  const handleSort = useCallback(
    (field: string) => {
      // 타입 가드로 SortField 타입인지 확인
      if (
        field === 'createdDate' ||
        field === 'viewCount' ||
        field === 'title'
      ) {
        setQueryParams((prev) => ({
          ...prev,
          sort: field,
          sortDirection:
            prev.sort === field && prev.sortDirection === 'DESC'
              ? 'ASC'
              : 'DESC',
          page: 0,
        }));

        if (isSearching && keyword) {
          searchRefetch();
        } else {
          refetch();
        }
      }
    },
    [refetch, searchRefetch, isSearching, keyword],
  );

  // 검색 핸들러
  const handleSearch = useCallback(
    (searchKeyword: string) => {
      setKeyword(searchKeyword);
      setIsSearching(!!searchKeyword);
      setQueryParams((prev) => ({ ...prev, page: 0 }));

      if (searchKeyword) {
        searchRefetch();
      } else {
        setIsSearching(false);
        refetch();
      }
    },
    [searchRefetch, refetch],
  );

  // 검색 초기화 핸들러
  const handleClearSearch = useCallback(() => {
    setKeyword('');
    setIsSearching(false);
    refetch();
  }, [refetch]);

  // 글쓰기 버튼 등 액션 렌더링 함수
  const renderActions = useCallback(() => {
    if (!auth?.isAuthenticated) return null;

    return (
      <WriteButton onClick={() => navigate('/news/noticeboard/create')}>
        글쓰기
      </WriteButton>
    );
  }, [auth?.isAuthenticated, navigate]);

  // 검색 중이면 검색 결과를, 아니면 일반 목록을 표시
  const notices = isSearching ? searchData?.data || [] : data?.data || [];
  const totalPages = isSearching
    ? searchData?.totalPage || 0
    : data?.totalPage || 0;
  const currentPage = (isSearching ? searchData?.page : data?.page) || 0;
  const isLoadingData = isLoading || isSearchLoading;
  const errorData = (isSearching ? searchError : error) || null;

  // 테이블 컬럼 정의
  const columns = [
    { key: 'id', label: '번호', width: '7%' },
    {
      key: 'title',
      label: '제목',
      width: '50%',
      sortable: true,
      render: (value: string, item: any) => <TitleText>{value}</TitleText>,
    },
    { key: 'writer', label: '작성자', width: '10%' },
    {
      key: 'createdDate',
      label: '등록일',
      width: '12%',
      sortable: true,
      render: (value: string) => formatDate(value),
    },
    {
      key: 'category',
      label: '카테고리',
      width: '10%',
      render: (value: string) =>
        CATEGORY_MAP[value as keyof typeof CATEGORY_MAP] || value,
    },
    {
      key: 'viewCount',
      label: '조회수',
      width: '7%',
      sortable: true,
    },
  ];

  return (
    <Container>
      <CategoryButtonGroup>
        <CategoryButton
          isActive={queryParams.category === 'all'}
          onClick={() => handleCategoryChange('all')}
        >
          전체
        </CategoryButton>
        {Object.entries(CATEGORY_MAP).map(([key, value]) => (
          <CategoryButton
            key={key}
            isActive={queryParams.category === key}
            onClick={() => handleCategoryChange(key)}
          >
            {value}
          </CategoryButton>
        ))}
      </CategoryButtonGroup>

      <SearchableBoard
        title="공지사항"
        section="board"
        columns={columns}
        items={notices}
        isLoading={isLoadingData}
        error={errorData}
        totalPages={totalPages}
        currentPage={currentPage + 1}
        sortField={queryParams.sort}
        sortDirection={queryParams.sortDirection}
        onPageChange={handlePageChange}
        onSort={handleSort}
        onSearch={handleSearch}
        searchKeyword={keyword}
        isSearching={isSearching}
        onClearSearch={handleClearSearch}
        renderActions={renderActions}
        detailUrl={(id) => `/news/noticeboard/${id}`}
        addActionUrl={
          auth?.isAuthenticated ? '/news/noticeboard/create' : undefined
        }
      />
    </Container>
  );
};

// 스타일 컴포넌트 정의
const CategoryButtonGroup = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${SEJONG_COLORS.CRIMSON_RED};

  // 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface CategoryButtonProps {
  isActive?: boolean;
}

const CategoryButton = styled.button<CategoryButtonProps>`
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  background: ${(props) =>
    props.isActive ? SEJONG_COLORS.CRIMSON_RED : 'transparent'};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;

  ${media.mobile} {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const WriteButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  &:hover {
    background-color: #f8f9fa;
    border-color: #ccc;
  }

  ${media.mobile} {
    padding: 0.375rem 0.75rem;
    min-width: 70px;
    height: 32px;
    font-size: 0.85rem;
  }
`;

const TitleText = styled.span`
  text-align: left;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 90%;
  cursor: pointer;
  font-weight: 500;
  color: #333;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    text-decoration: underline;
  }
`;

export default NoticeBoard;
