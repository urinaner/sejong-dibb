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

const NOTICE_TYPES = ['전체', '학부', '대학원'];

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('전체');
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 0,
    totalPages: 0,
    size: 5,
  });

  const fetchNotices = async (page = 0) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('인증이 필요합니다.');
      }

      // API 요청 헤더에 토큰 추가
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      const response = await axios.get<ApiResponse>(
        `${apiEndpoints.board.listWithPage(page, pageInfo.size)}`,
        // config,
      );

      setNotices(response.data.data);
      setPageInfo({
        currentPage: response.data.page,
        totalPages: response.data.totalPage,
        size: pageInfo.size,
      });
    } catch (error: any) {
      console.error('Failed to fetch notices:', error);
      let errorMessage = '게시글을 불러오는데 실패했습니다.';

      if (error.message === '인증이 필요합니다.') {
        navigate('/signin');
        return;
      }

      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = '로그인이 필요합니다.';
            navigate('/signin');
            break;
          case 403:
            errorMessage = '접근 권한이 없습니다.';
            break;
          default:
            errorMessage =
              error.response.data?.message || '서버 오류가 발생했습니다.';
        }
      }

      setError(errorMessage);
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
    if (!auth?.isAuthenticated) {
      navigate('/signin');
      return;
    }

    fetchNotices(pageInfo.currentPage);
  }, [selectedType, auth?.isAuthenticated]);

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
          {NOTICE_TYPES.map((type) => (
            <NavButton
              key={type}
              isActive={selectedType === type}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </NavButton>
          ))}
        </Navigation>
        <WriteButton onClick={() => navigate('/news/noticeboard/create')}>
          글쓰기
        </WriteButton>
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
