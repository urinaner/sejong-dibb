import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import moment from 'moment';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import {
  useSeminarList,
  useDeleteSeminar,
  seminarKeys,
} from '../../hooks/queries/useSeminar';
import { queryClient } from '../../lib/react-query/queryClient';
import { Modal, useModal } from '../../components/Modal';
import { SEJONG_COLORS } from '../../constants/colors';
import Pagination from '../../common/Pagination/Pagination';

const ITEMS_PER_PAGE = 10;

const SeminarList = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1); // 1부터 시작하도록 수정
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

  const {
    data: seminarData,
    isLoading,
    isError,
    error,
  } = useSeminarList({
    page: currentPage - 1, // API 요청시 0부터 시작하는 페이지로 변환
    size: ITEMS_PER_PAGE,
    sortDirection,
  });

  const deleteMutation = useDeleteSeminar();

  const handleEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/news/seminar/edit/${id}`);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          세미나 삭제
        </Modal.Header>
        <Modal.Content>
          <p>정말로 이 세미나를 삭제하시겠습니까?</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <Modal.DeleteButton onClick={() => confirmDelete(id)}>
            삭제
          </Modal.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const confirmDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: seminarKeys.lists() });
          openModal(
            <>
              <Modal.Header>
                <CheckCircle size={48} color="#38A169" />
                삭제 완료
              </Modal.Header>
              <Modal.Content>
                <p>세미나가 성공적으로 삭제되었습니다.</p>
              </Modal.Content>
              <Modal.Footer>
                <Modal.CloseButton />
              </Modal.Footer>
            </>,
          );
        },
      });
    } catch (error) {
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            삭제 실패
          </Modal.Header>
          <Modal.Content>
            <p>세미나를 삭제하는 중 오류가 발생했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    }
  };

  const formatDateTime = (dateTime: string) => {
    return moment(dateTime).format('YYYY-MM-DD HH:mm');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <LoadingSpinner>로딩 중...</LoadingSpinner>;
  if (isError)
    return (
      <ErrorMessage>
        {error instanceof Error
          ? error.message
          : '데이터를 불러오는데 실패했습니다.'}
      </ErrorMessage>
    );

  return (
    <Container>
      <Header>
        <Title>세미나 목록</Title>
        {auth?.isAuthenticated && (
          <CreateButton onClick={() => navigate('/news/seminar/create')}>
            <PlusCircle size={20} />
            세미나 등록
          </CreateButton>
        )}
      </Header>

      <Table>
        <thead>
          <tr>
            <Th width="5%">번호</Th>
            <Th width="25%">세미나명</Th>
            <Th width="10%">발표자</Th>
            <Th width="15%">소속</Th>
            <Th width="10%">장소</Th>
            <SortableTh
              width="25%"
              onClick={() =>
                setSortDirection((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'))
              }
              isActive={true}
              sortDirection={sortDirection.toLowerCase() as 'asc' | 'desc'}
            >
              일시
            </SortableTh>
            {auth?.isAuthenticated && <Th width="10%">관리</Th>}
          </tr>
        </thead>
        <tbody>
          {seminarData?.data.map((seminar) => (
            <Tr
              key={seminar.id}
              onClick={() => navigate(`/news/seminar/${seminar.id}`)}
            >
              <Td>{seminar.id}</Td>
              <TitleTd>{seminar.name}</TitleTd>
              <Td>{seminar.speaker}</Td>
              <Td>{seminar.company}</Td>
              <Td>{seminar.place}</Td>
              <DateTimeTd>
                <DateTimeText>
                  <div>{formatDateTime(seminar.startTime)}</div>
                  <div>~ {formatDateTime(seminar.endTime)}</div>
                </DateTimeText>
              </DateTimeTd>
              {auth?.isAuthenticated && (
                <ActionTd>
                  <ActionButton
                    onClick={(e) => handleEdit(e, seminar.id)}
                    color="blue"
                  >
                    <Edit2 size={16} />
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => handleDelete(e, seminar.id)}
                    color="red"
                  >
                    <Trash2 size={16} />
                  </ActionButton>
                </ActionTd>
              )}
            </Tr>
          ))}
        </tbody>
      </Table>

      {seminarData?.data.length === 0 && (
        <EmptyMessage>등록된 세미나가 없습니다.</EmptyMessage>
      )}

      <Pagination
        totalPages={seminarData?.totalPage ?? 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default SeminarList;

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Th = styled.th<{ width?: string }>`
  width: ${(props) => props.width || 'auto'};
  padding: 1.25rem 1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
  white-space: nowrap;

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

const DateTimeTd = styled(Td)`
  padding: 0.75rem 1rem;
`;

const DateTimeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;

  div {
    padding: 0.25rem 0;
  }
`;

const ActionTd = styled(Td)`
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;
`;

const ActionButton = styled.button<{ color: 'blue' | 'red' }>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) =>
      props.color === 'blue' ? '#3B82F6' : SEJONG_COLORS.CRIMSON_RED};
  background-color: white;
  color: ${(props) =>
    props.color === 'blue' ? '#3B82F6' : SEJONG_COLORS.CRIMSON_RED};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.color === 'blue' ? '#3B82F6' : SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }

  &:active {
    transform: translateY(1px);
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
