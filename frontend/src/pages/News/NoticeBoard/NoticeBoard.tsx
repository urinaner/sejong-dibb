import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import {
  Container,
  Navigation,
  NavButton,
  Table,
  Th,
  Td,
  Tr,
  TitleLink,
  ViewCount,
  ErrorMessage,
  LoadingSpinner,
  PaginationContainer,
  PageButton,
  WriteButton,
  HeaderContainer,
  NavButtonGroup,
} from './NoticeBoardStyle';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

interface NoticeItem {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  writer: string;
  createDate: string;
  category: string;
  file?: string;
}

const CATEGORY_MAP = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
} as const;

type CategoryKey = keyof typeof CATEGORY_MAP;

const NOTICE_TYPES = ['전체', ...Object.values(CATEGORY_MAP)] as const;

interface PageInfo {
  currentPage: number;
  totalPages: number;
  size: number;
}

interface ApiResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NoticeItem[];
}

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 0,
    totalPages: 0,
    size: 5,
  });

  const getEnglishCategory = (koreanType: string): CategoryKey | undefined => {
    if (koreanType === '전체') return undefined;
    const entry = Object.entries(CATEGORY_MAP).find(
      ([_, value]) => value === koreanType,
    );
    return entry ? (entry[0] as CategoryKey) : undefined;
  };

  const getCategoryLabel = (category: string): string => {
    return CATEGORY_MAP[category as CategoryKey] || category;
  };

  const fetchNotices = async (page = 0) => {
    setLoading(true);
    setError(null);

    try {
      const category = getEnglishCategory(selectedType);
      const endpoint = category
        ? `${apiEndpoints.board.base}/category/${category}?page=${page}&size=${pageInfo.size}`
        : apiEndpoints.board.listWithPage(page, pageInfo.size);

      const response = await axios.get<ApiResponse>(endpoint);

      setNotices(response.data.data);
      setPageInfo({
        currentPage: response.data.page,
        totalPages: response.data.totalPage,
        size: pageInfo.size,
      });
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setPageInfo((prev) => ({ ...prev, currentPage: 0 }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageInfo.totalPages) {
      fetchNotices(newPage);
    }
  };

  useEffect(() => {
    fetchNotices(pageInfo.currentPage);
  }, [selectedType]);

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      0,
      pageInfo.currentPage - Math.floor(maxVisiblePages / 2),
    );
    const endPage = Math.min(
      pageInfo.totalPages - 1,
      startPage + maxVisiblePages - 1,
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          isActive={i === pageInfo.currentPage}
        >
          {i + 1}
        </PageButton>,
      );
    }

    return (
      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(0)}
          disabled={pageInfo.currentPage === 0}
        >
          <span>⟪</span>
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(pageInfo.currentPage - 1)}
          disabled={pageInfo.currentPage === 0}
        >
          <span>⟨</span>
        </PageButton>
        {pages}
        <PageButton
          onClick={() => handlePageChange(pageInfo.currentPage + 1)}
          disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
        >
          <span>⟩</span>
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(pageInfo.totalPages - 1)}
          disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
        >
          <span>⟫</span>
        </PageButton>
      </PaginationContainer>
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <Navigation>
          <NavButtonGroup>
            {NOTICE_TYPES.map((type) => (
              <NavButton
                key={type}
                isActive={selectedType === type}
                onClick={() => handleTypeChange(type)}
              >
                {type}
              </NavButton>
            ))}
          </NavButtonGroup>
          {auth?.isAuthenticated && (
            <WriteButton onClick={() => navigate('/news/noticeboard/create')}>
              글쓰기
            </WriteButton>
          )}
        </Navigation>
      </HeaderContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>번호</Th>
                <Th>제목</Th>
                <Th>작성자</Th>
                <Th>등록일</Th>
                <Th>카테고리</Th>
                <Th style={{ textAlign: 'right' }}>조회수</Th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <Tr key={notice.id}>
                  <Td>{notice.id}</Td>
                  <Td>
                    <TitleLink
                      onClick={() => navigate(`/news/noticeboard/${notice.id}`)}
                    >
                      {notice.title}
                    </TitleLink>
                  </Td>
                  <Td>{notice.writer}</Td>
                  <Td>{notice.createDate}</Td>
                  <Td>{getCategoryLabel(notice.category)}</Td>
                  <ViewCount>{notice.viewCount.toLocaleString()}</ViewCount>
                </Tr>
              ))}
            </tbody>
          </Table>
          {renderPagination()}
        </>
      )}
    </Container>
  );
};

export default NoticeBoard;
