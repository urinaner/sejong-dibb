import React, { useState, useEffect, useContext, useCallback } from 'react';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeBoardStyle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useNoticeBoard } from './hooks/useNoticeBoard';
import type { NoticeItem, ApiResponse, SortField } from './types/notice.types';

export const CATEGORY_MAP = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { notices, loading, error, pageInfo, filters, updateFilters } =
    useNoticeBoard();

  const handleSort = useCallback(
    (field: SortField) => {
      updateFilters({
        sort: {
          field,
          direction:
            filters.sort.field === field && filters.sort.direction === 'asc'
              ? 'desc'
              : 'asc',
        },
      });
    },
    [filters.sort, updateFilters],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      updateFilters({
        category,
        page: 0, // 카테고리 변경 시 첫 페이지로 리셋
      });
    },
    [updateFilters],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

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

    const getSortIcon = (field: SortField) => {
      if (filters.sort.field !== field) return null;
      return filters.sort.direction === 'asc' ? ' ↑' : ' ↓';
    };

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
              isActive={filters.category === 'all'}
              onClick={() => handleCategoryChange('all')}
            >
              전체
            </S.NavButton>
            {Object.entries(CATEGORY_MAP).map(([key, value]) => (
              <S.NavButton
                key={key}
                isActive={filters.category === key}
                onClick={() => handleCategoryChange(key)}
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
            <S.SortableTh
              onClick={() => handleSort('title')}
              isActive={filters.sort.field === 'title'}
              sortDirection={filters.sort.direction}
            >
              제목
            </S.SortableTh>
            <S.Th>작성자</S.Th>
            <S.SortableTh
              onClick={() => handleSort('createDate')}
              isActive={filters.sort.field === 'createDate'}
              sortDirection={filters.sort.direction}
            >
              등록일
            </S.SortableTh>
            <S.Th>카테고리</S.Th>
            <S.SortableTh
              onClick={() => handleSort('viewCount')}
              isActive={filters.sort.field === 'viewCount'}
              sortDirection={filters.sort.direction}
              style={{ textAlign: 'right' }}
            >
              조회수
            </S.SortableTh>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice: NoticeItem) => (
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
              <S.Td>
                {CATEGORY_MAP[notice.category as keyof typeof CATEGORY_MAP] ||
                  notice.category}
              </S.Td>
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
