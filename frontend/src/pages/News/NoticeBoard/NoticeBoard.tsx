import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeBoardStyle';
import { useNavigate } from 'react-router-dom';
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

interface ApiResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NoticeItem[];
}

const CATEGORY_MAP = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};

type CategoryKey = keyof typeof CATEGORY_MAP;

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    size: 10,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchNotices = async (page = 0, category = selectedCategory) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        category === 'all'
          ? apiEndpoints.board.listWithPage(page, pageInfo.size)
          : `${apiEndpoints.board.base}/category/${category}?page=${page}&size=${pageInfo.size}`,
      );
      if (response.data?.data) {
        setNotices(response.data.data);
        setPageInfo({
          currentPage: response.data.page,
          totalPages: response.data.totalPage,
          size: pageInfo.size,
        });
      }
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  const getCategoryLabel = (category: string): string => {
    return CATEGORY_MAP[category as CategoryKey] || category;
  };

  const formatViewCount = (count: number | undefined): string => {
    if (typeof count === 'undefined') return '0';
    return count.toLocaleString();
  };

  const renderPagination = () => {
    const pages = [];
    const totalPages = pageInfo.totalPages;
    const currentPageNum = pageInfo.currentPage + 1;

    // 첫 페이지와 이전 버튼
    pages.push(
      <S.PageButton
        key="first"
        onClick={() => handlePageChange(0)}
        disabled={currentPageNum === 1}
      >
        ⟪
      </S.PageButton>,
      <S.PageButton
        key="prev"
        onClick={() => handlePageChange(pageInfo.currentPage - 1)}
        disabled={currentPageNum === 1}
      >
        ⟨
      </S.PageButton>,
    );

    // 10페이지 이하일 경우 모든 페이지 표시
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <S.PageButton
            key={i}
            onClick={() => handlePageChange(i - 1)}
            isActive={i === currentPageNum}
          >
            {i}
          </S.PageButton>,
        );
      }
    } else {
      // 10페이지 초과시 페이지 범위 계산하여 표시
      let startPage = Math.max(1, currentPageNum - 4);
      const endPage = Math.min(totalPages, startPage + 9);

      if (endPage - startPage < 9) {
        startPage = Math.max(1, endPage - 9);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <S.PageButton
            key={i}
            onClick={() => handlePageChange(i - 1)}
            isActive={i === currentPageNum}
          >
            {i}
          </S.PageButton>,
        );
      }
    }

    // Next and Last buttons
    pages.push(
      <S.PageButton
        key="next"
        onClick={() => handlePageChange(pageInfo.currentPage + 1)}
        disabled={currentPageNum === totalPages}
      >
        ⟩
      </S.PageButton>,
      <S.PageButton
        key="last"
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={currentPageNum === totalPages}
      >
        ⟫
      </S.PageButton>,
    );

    return <S.PaginationContainer>{pages}</S.PaginationContainer>;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageInfo.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <S.LoadingSpinner>Loading...</S.LoadingSpinner>;
  }

  if (error) {
    return <S.ErrorMessage>{error}</S.ErrorMessage>;
  }

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Navigation>
          <S.NavButtonGroup>
            <S.NavButton
              isActive={selectedCategory === 'all'}
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(0);
                fetchNotices(0, 'all');
              }}
            >
              전체
            </S.NavButton>
            {Object.entries(CATEGORY_MAP).map(([key, value]) => (
              <S.NavButton
                key={key}
                isActive={selectedCategory === key}
                onClick={() => {
                  setSelectedCategory(key);
                  setCurrentPage(0);
                  fetchNotices(0, key);
                }}
              >
                {value}
              </S.NavButton>
            ))}
          </S.NavButtonGroup>
          {auth?.isAuthenticated && (
            <S.WriteButton onClick={() => navigate('/news/noticeboard/create')}>
              글쓰기
            </S.WriteButton>
          )}
        </S.Navigation>
      </S.HeaderContainer>

      <S.Table>
        <thead>
          <tr>
            <S.Th>번호</S.Th>
            <S.Th>제목</S.Th>
            <S.Th>작성자</S.Th>
            <S.Th>등록일</S.Th>
            <S.Th>카테고리</S.Th>
            <S.Th style={{ textAlign: 'right' }}>조회수</S.Th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <S.Tr key={notice.id}>
              <S.Td>{notice.id}</S.Td>
              <S.Td>
                <S.TitleLink
                  onClick={() => navigate(`/news/noticeboard/${notice.id}`)}
                >
                  {notice.title}
                </S.TitleLink>
              </S.Td>
              <S.Td>{notice.writer}</S.Td>
              <S.Td>{notice.createDate}</S.Td>
              <S.Td>{getCategoryLabel(notice.category)}</S.Td>
              <S.ViewCount>{formatViewCount(notice.viewCount)}</S.ViewCount>
            </S.Tr>
          ))}
        </tbody>
      </S.Table>

      {notices.length === 0 && (
        <S.EmptyMessage>등록된 게시글이 없습니다.</S.EmptyMessage>
      )}

      {pageInfo.totalPages > 1 && renderPagination()}
    </S.Container>
  );
};

export default NoticeBoard;
