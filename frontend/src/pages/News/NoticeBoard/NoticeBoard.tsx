import React, { useState, useEffect, useContext, useCallback } from 'react';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeBoardStyle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useNoticeBoard } from './hooks/useNoticeBoard';
import type { NoticeItem, ApiResponse, SortField } from './types/notice.types';
import Pagination from '../../../common/Pagination/Pagination';

export const CATEGORY_MAP = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return dateString; // 유효하지 않은 날짜면 원본 문자열 반환
  }

  // 날짜를 YYYY-MM-DD 형식으로 변환
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '');
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

  return (
    <S.Container>
      <S.Title>공지사항</S.Title>
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
              onClick={() => handleSort('createdDate')}
              isActive={filters.sort.field === 'createdDate'}
              sortDirection={filters.sort.direction}
            >
              등록일
            </S.SortableTh>{' '}
            <S.Th>카테고리</S.Th>
            <S.SortableTh
              onClick={() => handleSort('viewCount')}
              isActive={filters.sort.field === 'viewCount'}
              sortDirection={filters.sort.direction}
              style={{ width: '7rem' }}
            >
              조회수
            </S.SortableTh>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice: NoticeItem) => (
            <S.Tr key={notice.id}>
              <S.Td>{notice.id}</S.Td>
              <S.Td style={{ textAlign: 'left' }}>
                <S.TitleLink
                  onClick={() => navigate(`/news/noticeboard/${notice.id}`)}
                >
                  {notice.title}
                </S.TitleLink>
              </S.Td>
              <S.Td>{notice.writer}</S.Td>
              <S.Td>{formatDate(notice.createdDate)}</S.Td>{' '}
              {/* 이 부분이 수정됨 */}
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

      {pageInfo.totalPages > 1 && (
        <Pagination
          totalPages={pageInfo.totalPages}
          currentPage={pageInfo.currentPage + 1}
          onPageChange={(newPage) => handlePageChange(newPage)}
        />
      )}
    </S.Container>
  );
};

export default NoticeBoard;
