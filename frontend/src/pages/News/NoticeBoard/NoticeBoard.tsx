import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeBoardStyle';
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
} as const;

type CategoryKey = keyof typeof CATEGORY_MAP;

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          apiEndpoints.board.listWithPage(currentPage, 10),
        );
        if (response.data?.data) {
          setNotices(response.data.data);
          setTotalPages(response.data.totalPage);
        }
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
        console.error('Error fetching notices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [currentPage]);

  const getCategoryLabel = (category: string): string => {
    return CATEGORY_MAP[category as CategoryKey] || category;
  };

  const formatViewCount = (count: number | undefined): string => {
    if (typeof count === 'undefined') return '0';
    return count.toLocaleString();
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
            <S.NavButton>전체</S.NavButton>
            {Object.values(CATEGORY_MAP).map((category) => (
              <S.NavButton key={category}>{category}</S.NavButton>
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
            </S.Tr>
          ))}
        </tbody>
      </S.Table>

      {notices.length === 0 && (
        <S.EmptyMessage>등록된 게시글이 없습니다.</S.EmptyMessage>
      )}

      {totalPages > 1 && (
        <S.Pagination>
          <S.PageButton
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            이전
          </S.PageButton>
          <span>
            {currentPage + 1} / {totalPages}
          </span>
          <S.PageButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            다음
          </S.PageButton>
        </S.Pagination>
      )}
    </S.Container>
  );
};

export default NoticeBoard;
