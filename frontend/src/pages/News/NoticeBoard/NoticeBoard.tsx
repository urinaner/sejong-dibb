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

const CATEGORY_MAP: { [key: string]: string } = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};
const NOTICE_TYPES = ['전체', '학부', '대학원', '취업', '장학'];

const REVERSE_CATEGORY_MAP: { [key: string]: string } = {
  학부: 'undergraduate',
  대학원: 'graduate',
  취업: 'employment',
  장학: 'scholarship',
};

const getEnglishCategory = (koreanType: string): string | undefined => {
  return REVERSE_CATEGORY_MAP[koreanType];
};

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

// 더미데이터 생성 함수 유지

/*
const generateDummyNotices = (
    page: number,
    size: number,
    type: string,
): ApiResponse => {
  const totalItems = 23;
  const totalPages = Math.ceil(totalItems / size);
  const startIndex = page * size;

  const dummyData = Array.from(
      { length: Math.min(size, totalItems - startIndex) },
      (_, index) => {
        const id = startIndex + index + 1;
        const category =
            type === '전체'
                ? ['학부', '대학원'][Math.floor(Math.random() * 2)]
                : type;

        return {
          id: id,
          title: `${category} 공지사항 ${id}`,
          content: `게시글 내용 ${id}`,
          viewCount: Math.floor(Math.random() * 100),
          writer: `작성자${Math.floor(Math.random() * 5) + 1}`,
          createDate: new Date(2024, 0, id).toISOString().split('T')[0],
          category: category,
        };
      },
  );

  return {
    message: '조회성공',
    page: page,
    totalPage: totalPages,
    data: dummyData,
  };
};
*/

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

  const getCategoryLabel = (category: string): string => {
    return CATEGORY_MAP[category] || category;
  };

  const fetchNotices = async (page = 0) => {
    setLoading(true);
    setError(null);

    try {
      const category =
        selectedType !== '전체' ? getEnglishCategory(selectedType) : undefined;

      const response = await axios.get<ApiResponse>(
        apiEndpoints.board.listWithPage(page, pageInfo.size, category),
      );

      setNotices(response.data.data);
      setPageInfo({
        currentPage: response.data.page,
        totalPages: response.data.totalPage,
        size: pageInfo.size,
      });
    } catch (error: any) {
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
