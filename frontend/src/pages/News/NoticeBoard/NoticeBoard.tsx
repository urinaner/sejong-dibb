import React, { useContext, useCallback, useState } from 'react';
import * as S from './NoticeBoardStyle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import useNotice from '../../../hooks/queries/useNotice';
import Pagination from '../../../common/Pagination/Pagination';
import type { NoticeQueryParams } from '../../../types/api/notice';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import Container from '../../../styles/Container';

export const CATEGORY_MAP = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};

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

  const [queryParams, setQueryParams] = useState<NoticeQueryParams>({
    category: 'all',
    page: 0,
    size: 10,
    sort: 'createdDate',
    sortDirection: 'DESC',
  });

  const { data, isLoading, error, refetch } =
    useNotice.useGetNoticeList(queryParams);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setQueryParams((prev) => ({ ...prev, category, page: 0 }));
      refetch();
    },
    [refetch],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setQueryParams((prev) => ({ ...prev, page: newPage - 1 }));
      refetch();
    },
    [refetch],
  );

  if (isLoading) {
    return <LoadingSpinner text="게시글을 불러오는 중입니다..." />;
  }

  if (error || !data) {
    return <S.ErrorMessage>게시글을 불러오는데 실패했습니다.</S.ErrorMessage>;
  }

  const notices = data.data || [];
  const totalPages = data.totalPage || 0;
  const currentPage = data.page || 0;

  return (
    <Container>
      <S.HeaderContainer>
        <S.Navigation>
          <S.NavButtonGroup>
            <S.NavButton
              isActive={queryParams.category === 'all'}
              onClick={() => handleCategoryChange('all')}
            >
              전체
            </S.NavButton>
            {Object.entries(CATEGORY_MAP).map(([key, value]) => (
              <S.NavButton
                key={key}
                isActive={queryParams.category === key}
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
            <S.Th>제목</S.Th>
            <S.Th>작성자</S.Th>
            <S.Th>등록일</S.Th>
            <S.Th>카테고리</S.Th>
            <S.Th>조회수</S.Th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <S.Tr
              key={notice.id}
              onClick={() => navigate(`/news/noticeboard/${notice.id}`)}
            >
              <S.Td>{notice.id}</S.Td>
              <S.Td>{notice.title}</S.Td>
              <S.Td>{notice.writer}</S.Td>
              <S.Td>{formatDate(notice.createdDate)}</S.Td>
              <S.Td>
                {CATEGORY_MAP[notice.category as keyof typeof CATEGORY_MAP] ||
                  notice.category}
              </S.Td>
              <S.ViewCount>{notice.viewCount}</S.ViewCount>
            </S.Tr>
          ))}
        </tbody>
      </S.Table>

      {notices.length === 0 && (
        <S.EmptyMessage>등록된 게시글이 없습니다.</S.EmptyMessage>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage + 1}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default NoticeBoard;
