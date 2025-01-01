import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { apiEndpoints } from '../../config/apiConfig';

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
    navigate('/seminar/create');
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
              onClick={() => navigate(`/seminar/${seminar.id}`)}
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
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #1a202c;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: #fff;
`;

const Th = styled.th`
  padding: 1rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
  font-weight: 600;
  text-align: center;
`;

const SortableTh = styled(Th)<{
  isActive?: boolean;
  sortDirection?: 'asc' | 'desc';
}>`
  cursor: pointer;
  position: relative;
  padding-right: 25px;

  &:after {
    content: '${(props) => (props.sortDirection === 'asc' ? '↑' : '↓')}';
    position: absolute;
    right: 8px;
  }

  &:hover {
    background-color: #f1f3f5;
  }
`;

const Tr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const TitleTd = styled(Td)`
  text-align: left;
  font-weight: 500;
`;

const CreateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8b0000;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.isActive ? '#666' : '#ddd')};
  background-color: ${(props) => (props.isActive ? '#666' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  min-width: 40px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.isActive ? '#555' : '#f8f9fa')};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 4px;
  border: 1px solid #feb2b2;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1rem;
`;

export default SeminarList;
