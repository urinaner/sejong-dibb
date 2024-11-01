import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Navigation,
  NavButton,
  Table,
  Th,
  Td,
  Tr,
  NoticeTag,
  NewTag,
  TitleLink,
  PaginationContainer,
  PageButton,
  ViewCount,
  ErrorMessage,
  LoadingSpinner,
} from './NoticeBoardStyle';

// API 엔드포인트 설정
const API_URL = process.env.REACT_APP_API_URL;
const API_ENDPOINTS = {
  board: {
    list: `${API_URL}/api/board`,
    create: `${API_URL}/api/board`,
    get: (id: number) => `${API_URL}/api/board/${id}`,
    update: (id: number) => `${API_URL}/api/board/${id}`,
    delete: (id: number) => `${API_URL}/api/board/${id}`,
  },
};

// 타입 정의
type NoticeType = '전체' | '학부' | '대학원' | '선택' | '공지';

interface NoticeItem {
  id: number;
  type: NoticeType;
  title: string;
  department: string;
  date: string;
  views: number;
  isNew?: boolean;
  content?: string;
}

interface BoardReqDto {
  type: NoticeType;
  title: string;
  department: string;
  content?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface ApiResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// 페이지네이션 컴포넌트
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageRange = () => {
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    if (currentPage <= range) {
      end = Math.min(totalPages, range * 2 + 1);
    } else if (currentPage >= totalPages - range) {
      start = Math.max(1, totalPages - range * 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <PaginationContainer>
      <PageButton onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {'<<'}
      </PageButton>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </PageButton>

      {getPageRange().map((page) => (
        <PageButton
          key={page}
          isActive={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </PageButton>
      <PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </PageButton>
    </PaginationContainer>
  );
};

const NoticeBoard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState<NoticeType>('전체');

  // API 호출 함수들
  const fetchNotices = async (page: number, type: NoticeType = '전체') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse<NoticeItem>>(
        `${API_ENDPOINTS.board.list}?page=${page - 1}&size=10&type=${type}`,
      );
      const { content, totalPages } = response.data;

      // NEW 태그 처리 (7일 이내 게시물)
      const now = new Date();
      const processedContent = content.map((notice) => ({
        ...notice,
        isNew:
          now.getTime() - new Date(notice.date).getTime() <=
          7 * 24 * 60 * 60 * 1000,
      }));

      setNotices(processedContent);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const createNotice = async (noticeData: BoardReqDto) => {
    try {
      await axios.post(API_ENDPOINTS.board.create, noticeData);
      await fetchNotices(currentPage, selectedType);
    } catch (error) {
      console.error('Failed to create notice:', error);
      throw error;
    }
  };

  const updateNotice = async (id: number, noticeData: BoardReqDto) => {
    try {
      await axios.post(API_ENDPOINTS.board.update(id), noticeData);
      await fetchNotices(currentPage, selectedType);
    } catch (error) {
      console.error('Failed to update notice:', error);
      throw error;
    }
  };

  const deleteNotice = async (id: number) => {
    try {
      await axios.delete(API_ENDPOINTS.board.delete(id));
      await fetchNotices(currentPage, selectedType);
    } catch (error) {
      console.error('Failed to delete notice:', error);
      throw error;
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 타입 필터 변경 핸들러
  const handleTypeChange = (type: NoticeType) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // 데이터 로딩
  useEffect(() => {
    fetchNotices(currentPage, selectedType);
  }, [currentPage, selectedType]);

  const NOTICE_TYPES: NoticeType[] = ['전체', '학부', '대학원', '선택'];

  return (
    <Container>
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

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>분류</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>등록일</Th>
              <Th style={{ textAlign: 'right' }}>조회수</Th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <Tr key={notice.id}>
                <Td>
                  {notice.type === '공지' ? (
                    <NoticeTag>공지</NoticeTag>
                  ) : (
                    notice.type
                  )}
                </Td>
                <Td>
                  <TitleLink
                    onClick={() =>
                      (window.location.href = `/notice/${notice.id}`)
                    }
                  >
                    {notice.title}
                    {notice.isNew && <NewTag>NEW</NewTag>}
                  </TitleLink>
                </Td>
                <Td>{notice.department}</Td>
                <Td>{notice.date}</Td>
                <ViewCount>{notice.views.toLocaleString()}</ViewCount>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default NoticeBoard;
