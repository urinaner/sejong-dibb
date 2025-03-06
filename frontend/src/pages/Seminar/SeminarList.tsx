import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Edit2,
  Trash2,
  PlusCircle,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import moment from 'moment';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import {
  useSeminarList,
  useSearchSeminars,
  useDeleteSeminar,
  seminarKeys,
  SeminarSearchParams,
} from '../../hooks/queries/useSeminar';
import { queryClient } from '../../lib/react-query/queryClient';
import { Modal, useModal } from '../../components/Modal';
import { SEJONG_COLORS } from '../../constants/colors';
import SearchableBoard from '../../common/SearchableBoard';
import Container from '../../styles/Container';

const ITEMS_PER_PAGE = 10;

const SeminarList = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1); // 1부터 시작
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 기본 세미나 리스트 조회
  const {
    data: seminarListData,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useSeminarList(
    {
      page: currentPage - 1, // API 요청시 0부터 시작하는 페이지로 변환
      size: ITEMS_PER_PAGE,
      sortDirection,
    },
    {
      enabled: !isSearching, // 검색 모드가 아닐 때만 기본 목록 로드
    },
  );

  // 검색 파라미터
  const searchParams: SeminarSearchParams = {
    keyword: searchKeyword,
    page: currentPage - 1, // 백엔드 페이징은 0부터 시작
    size: ITEMS_PER_PAGE,
  };

  // 검색 결과 조회
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchSeminars(searchParams, {
    enabled: isSearching && !!searchKeyword,
  });

  // 삭제 Mutation
  const deleteMutation = useDeleteSeminar();

  // 실제 화면에 표시할 데이터
  const displayData = isSearching ? searchResults : seminarListData;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const isError = isSearching ? isSearchError : isListError;
  const error = isSearching ? searchError : listError;

  // 검색 처리 함수
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    if (keyword) {
      setIsSearching(true);
      setCurrentPage(1); // 검색 시 첫 페이지로 이동
    } else {
      handleClearSearch();
    }
  };

  // 검색 초기화 함수
  const handleClearSearch = () => {
    setSearchKeyword('');
    setIsSearching(false);
    setCurrentPage(1);
  };

  // 정렬 처리 함수
  const handleSort = () => {
    setSortDirection((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 삭제 확인 모달
  const confirmDelete = (id: number) => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangleIcon size={48} color="#E53E3E" />
          세미나 삭제
        </Modal.Header>
        <Modal.Content>
          <p>정말로 이 세미나를 삭제하시겠습니까?</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <DeleteButton
            onClick={() => handleDelete(id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  // 삭제 처리 함수
  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: seminarKeys.all });
          openModal(
            <>
              <Modal.Header>
                <CheckCircleIcon size={48} color="#38A169" />
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
            <AlertTriangleIcon size={48} color="#E53E3E" />
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

  // 날짜 포맷팅 함수
  const formatDateTime = (dateTime: string) => {
    return moment(dateTime).format('YYYY-MM-DD HH:mm');
  };

  // 테이블 컬럼 정의
  const columns = [
    { key: 'id', label: '번호', width: '5%' },
    { key: 'name', label: '세미나명', width: '25%' },
    { key: 'speaker', label: '연사', width: '10%' },
    { key: 'company', label: '소속', width: '15%' },
    { key: 'place', label: '장소', width: '10%' },
    {
      key: 'startTime',
      label: '일시',
      width: '25%',
      sortable: true,
      render: (value: string, item: any) => (
        <DateTimeText>
          <div>{formatDateTime(item.startTime)}</div>
          <div>~ {formatDateTime(item.endTime)}</div>
        </DateTimeText>
      ),
    },
    ...(auth?.isAuthenticated
      ? [
          {
            key: 'actions',
            label: '관리',
            width: '10%',
            render: (_: any, item: any) => (
              <ActionButtons>
                <ActionButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    navigate(`/news/seminar/edit/${item.id}`);
                  }}
                  color="blue"
                >
                  <Edit2 size={16} />
                </ActionButton>
                <ActionButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    confirmDelete(item.id);
                  }}
                  color="red"
                >
                  <Trash2 size={16} />
                </ActionButton>
              </ActionButtons>
            ),
          },
        ]
      : []),
  ];

  // 액션 버튼 렌더 함수
  const renderActions = () => {
    if (auth?.isAuthenticated) {
      return (
        <CreateButton onClick={() => navigate('/news/seminar/create')}>
          <PlusCircle size={20} />
          세미나 등록
        </CreateButton>
      );
    }
    return null;
  };

  return (
    <Container>
      <SearchableBoard
        title="세미나 목록"
        section="seminar"
        columns={columns}
        items={displayData?.data || []}
        isLoading={isLoading}
        error={error}
        totalPages={displayData?.totalPage || 0}
        currentPage={currentPage}
        sortField="startTime"
        sortDirection={sortDirection}
        onPageChange={handlePageChange}
        onSort={handleSort}
        onSearch={handleSearch}
        searchKeyword={searchKeyword}
        isSearching={isSearching}
        onClearSearch={handleClearSearch}
        emptyMessage="등록된 세미나가 없습니다."
        renderActions={renderActions}
        detailUrl={(id) => `/news/seminar/${id}`}
        addActionUrl={
          auth?.isAuthenticated ? '/news/seminar/create' : undefined
        }
      />
    </Container>
  );
};

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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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
`;

const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};
  background-color: white;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// 아이콘 컴포넌트
const AlertTriangleIcon = styled(AlertTriangle)``;
const CheckCircleIcon = styled(CheckCircle)``;

export default SeminarList;
