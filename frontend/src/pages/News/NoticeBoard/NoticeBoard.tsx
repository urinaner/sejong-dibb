// NoticeBoard.tsx
import React from 'react';
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

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      <PageButton onClick={() => onPageChange(1)}>{'<<'}</PageButton>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </PageButton>
      {pages.map((page) => (
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
      <PageButton onClick={() => onPageChange(totalPages)}>{'>>'}</PageButton>
    </PaginationContainer>
  );
};

const NoticeBoard: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [notices, setNotices] = React.useState<NoticeItem[]>([]);
  // const [totalPages, setTotalPages] = React.useState(0);
  // const [loading, setLoading] = React.useState(false);

  // const fetchNotices = async (page: number) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get('/api/notices', {
  //       params: {
  //         page,
  //         pageSize: 10
  //       }
  //     });
  //
  //     setNotices(response.data.data.notices);
  //     setTotalPages(response.data.data.pagination.totalPages);
  //   } catch (error) {
  //     console.error('Failed to fetch notices:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchNotices(currentPage);
  // }, [currentPage]);
  //
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };
  // api fetch 로직 임시 구현

  const noticeData: NoticeItem[] = [
    {
      id: 1,
      type: '공지',
      title:
        '[공학교육센터] 2024년 나노신소재공학과 신입생 공학인증 이수안내문',
      department: '나노신소재공학교',
      date: '2024-03-19',
      views: 1320,
      isNew: true,
    },
    {
      id: 2,
      type: '전체',
      title: '[공학교육센터]공학인증 이수 안내문 공지(변경사항 필독)',
      department: '나노신소재공학과',
      date: '2024-09-11',
      views: 39,
    },
  ];

  return (
    <Container>
      <Navigation>
        <NavButton>전체</NavButton>
        <NavButton>학부</NavButton>
        <NavButton>대학원</NavButton>
        <NavButton>선택</NavButton>
        <NavButton isActive>검색</NavButton>
      </Navigation>

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
          {noticeData.map((notice) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default NoticeBoard;
