// NoticeBoard.tsx
import React, { useState, useEffect } from 'react';
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
} from './NoticeBoardStyle';

// ... 기존 인터페이스 정의 유지
interface NoticeItem {
  id: number;
  type: string;
  title: string;
  department: string;
  date: string;
  views: number;
  isNew?: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 더미 데이터 배열 - 실제로는 별도 파일로 분리하는 것을 추천
const DUMMY_NOTICES: NoticeItem[] = Array.from({ length: 55 }, (_, index) => ({
  id: index + 1,
  type: index % 5 === 0 ? '공지' : '전체',
  title: `[공지사항] 테스트 게시글 제목 ${index + 1}`,
  department: `테스트학과 ${(index % 3) + 1}`,
  date: new Date(2024, 0, index + 1).toISOString().split('T')[0],
  views: Math.floor(Math.random() * 1000),
  isNew: index < 5, // 최근 5개 게시글에 NEW 표시
}));

// 페이지네이션 로직을 위한 유틸리티 함수
const paginateData = (
  data: NoticeItem[],
  currentPage: number,
  itemsPerPage: number,
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 페이지 번호 범위 계산 (현재 페이지 주변 5개 페이지만 표시)
  const getPageRange = () => {
    const range = 2; // 현재 페이지 양쪽으로 보여줄 페이지 수
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // 페이지 범위가 시작 또는 끝에 가까울 때 조정
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

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(DUMMY_NOTICES.length / ITEMS_PER_PAGE);

  // 데이터 로딩을 시뮬레이션하는 함수
  const fetchNotices = async (page: number) => {
    setLoading(true);
    try {
      // 실제 API 호출을 시뮬레이션하기 위한 인위적인 지연
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 페이지에 해당하는 데이터만 잘라서 반환
      const paginatedData = paginateData(DUMMY_NOTICES, page, ITEMS_PER_PAGE);
      setNotices(paginatedData);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 시 데이터 로딩
  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Navigation>
        <NavButton isActive>전체</NavButton>
        <NavButton>학부</NavButton>
        <NavButton>대학원</NavButton>
        <NavButton>선택</NavButton>
        <NavButton>검색</NavButton>
      </Navigation>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
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
                  <TitleLink>
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
