import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { apiEndpoints } from '../../config/apiConfig';
import { SEJONG_COLORS } from '../../constants/colors';

interface SeminarItem {
  id: number;
  name: string;
  writer: string;
  place: string;
  startDate: string;
  endDate: string;
  speaker: string;
  company: string;
}

interface PageResponse {
  message: string;
  page: number;
  totalPage: number;
  data: SeminarItem[];
}

const SeminarList = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [seminars, setSeminars] = useState<SeminarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
  });
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

  useEffect(() => {
    fetchSeminars();
  }, [pageInfo.currentPage, sortDirection]);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      const response = await axios.get<PageResponse>(
        apiEndpoints.seminar.listWithPage(
          pageInfo.currentPage,
          10,
          sortDirection,
        ),
      );

      setSeminars(response.data.data);
      setPageInfo({
        currentPage: response.data.page,
        totalPages: response.data.totalPage,
      });
    } catch (err) {
      setError('세미나 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPageInfo((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace('.', '');
  };

  const handleCreateClick = () => {
    navigate('/news/seminar/create');
  };

  if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Header>
        <Title>세미나 목록</Title>
        {auth?.isAuthenticated && (
          <CreateButton onClick={handleCreateClick}>세미나 등록</CreateButton>
        )}
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>세미나명</Th>
            <Th>발표자</Th>
            <Th>소속</Th>
            <Th>장소</Th>
            <SortableTh
              onClick={() =>
                setSortDirection((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'))
              }
              isActive={true}
              sortDirection={sortDirection.toLowerCase() as 'asc' | 'desc'}
            >
              날짜
            </SortableTh>
          </tr>
        </thead>
        <tbody>
          {seminars.map((seminar) => (
            <Tr
              key={seminar.id}
              onClick={() => navigate(`/news/seminar/${seminar.id}`)}
            >
              <Td>{seminar.id}</Td>
              <TitleTd>{seminar.name}</TitleTd>
              <Td>{seminar.speaker}</Td>
              <Td>{seminar.company}</Td>
              <Td>{seminar.place}</Td>
              <Td>{formatDate(seminar.startDate)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {seminars.length === 0 && (
        <EmptyMessage>등록된 세미나가 없습니다.</EmptyMessage>
      )}

      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(0)}
          disabled={pageInfo.currentPage === 0}
        >
          ⟪
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(pageInfo.currentPage - 1)}
          disabled={pageInfo.currentPage === 0}
        >
          ⟨
        </PageButton>
        {Array.from({ length: pageInfo.totalPages }, (_, i) => (
          <PageButton
            key={i}
            onClick={() => handlePageChange(i)}
            isActive={i === pageInfo.currentPage}
          >
            {i + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(pageInfo.currentPage + 1)}
          disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
        >
          ⟩
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(pageInfo.totalPages - 1)}
          disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
        >
          ⟫
        </PageButton>
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  font-weight: 600;
`;

const CreateButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #8b0000;
    box-shadow: 0 2px 4px rgba(139, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 1.25rem 1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const SortableTh = styled(Th)<{
  isActive?: boolean;
  sortDirection?: 'asc' | 'desc';
}>`
  cursor: pointer;
  position: relative;
  padding-right: 25px;
  transition: background-color 0.2s;

  &:after {
    content: '${(props) => (props.sortDirection === 'asc' ? '↑' : '↓')}';
    position: absolute;
    right: 8px;
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  &:hover {
    background-color: ${SEJONG_COLORS.COOL_GRAY}30;
  }
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${SEJONG_COLORS.COOL_GRAY}10;
  }
`;

const Td = styled.td`
  padding: 1.25rem 1rem;
  text-align: center;
  border-bottom: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
`;

const TitleTd = styled(Td)`
  text-align: left;
  font-weight: 500;
  color: ${SEJONG_COLORS.CRIMSON_RED};

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${(props) =>
      props.isActive ? SEJONG_COLORS.CRIMSON_RED : SEJONG_COLORS.COOL_GRAY};
  background-color: ${(props) =>
    props.isActive ? SEJONG_COLORS.CRIMSON_RED : 'white'};
  color: ${(props) => (props.isActive ? 'white' : SEJONG_COLORS.GRAY)};
  cursor: pointer;
  min-width: 40px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.isActive ? '#8b0000' : SEJONG_COLORS.COOL_GRAY}10;
    border-color: ${(props) =>
      props.isActive ? '#8b0000' : SEJONG_COLORS.CRIMSON_RED};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}20;
  font-weight: 500;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${SEJONG_COLORS.GRAY};
  background-color: ${SEJONG_COLORS.COOL_GRAY}10;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 1.1rem;
`;

export default SeminarList;
