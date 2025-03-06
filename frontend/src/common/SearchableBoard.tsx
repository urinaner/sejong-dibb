import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { LoadingSpinner } from '../components/LoadingSpinner';
import Pagination from './Pagination/Pagination';
import { SEJONG_COLORS } from '../constants/colors';
import { media } from '../styles/media';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface BoardItem {
  id: number;
  [key: string]: any;
}

interface SearchableBoardProps {
  title: string;
  section: 'board' | 'news' | 'seminar' | 'thesis';
  columns: Column[];
  items: BoardItem[];
  isLoading: boolean;
  error: any;
  totalPages: number;
  currentPage: number;
  sortField?: string;
  sortDirection?: 'ASC' | 'DESC';
  onPageChange: (page: number) => void;
  onSort?: (field: string) => void;
  onSearch: (keyword: string) => void;
  searchKeyword?: string;
  isSearching?: boolean;
  onClearSearch?: () => void;
  emptyMessage?: string;
  renderActions?: () => React.ReactNode;
  detailUrl: (id: number) => string;
  addActionUrl?: string;
}

const SearchableBoard: React.FC<SearchableBoardProps> = ({
  title,
  section,
  columns,
  items,
  isLoading,
  error,
  totalPages,
  currentPage,
  sortField,
  sortDirection,
  onPageChange,
  onSort,
  onSearch,
  searchKeyword = '',
  isSearching = false,
  onClearSearch,
  emptyMessage = '등록된 게시글이 없습니다.',
  renderActions,
  detailUrl,
  addActionUrl,
}) => {
  const navigate = useNavigate();

  const handleRowClick = useCallback(
    (id: number) => {
      navigate(detailUrl(id));
    },
    [navigate, detailUrl],
  );

  if (isLoading) {
    return <LoadingSpinner text={`${title}를 불러오는 중입니다...`} />;
  }

  if (error) {
    return <ErrorMessage>{`${title}를 불러오는데 실패했습니다.`}</ErrorMessage>;
  }

  return (
    <div>
      {/* 제목과 검색 컴포넌트를 같은 줄에 배치 */}
      <HeaderSection>
        <BoardTitle>{title}</BoardTitle>
        <SearchComponent
          onSearch={onSearch}
          placeholder="검색어를 입력하세요"
          initialValue={searchKeyword}
          searchInProgress={isLoading}
          section={section}
        />
      </HeaderSection>

      {/* 액션 버튼 섹션 (글쓰기 등) */}
      {renderActions && (
        <ActionSection>
          <ActionContainer>{renderActions()}</ActionContainer>
        </ActionSection>
      )}

      {/* 검색 결과 정보 표시 */}
      {isSearching && searchKeyword && (
        <SearchResultInfo>
          <span>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <strong>"{searchKeyword}"</strong>에 대한 검색 결과: 총{' '}
            <Count>{items.length}</Count>건
          </span>
          {onClearSearch && (
            <ClearSearchButton onClick={onClearSearch}>
              검색 초기화
            </ClearSearchButton>
          )}
        </SearchResultInfo>
      )}

      {/* 테이블 컨테이너 */}
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <Th
                  key={column.key}
                  style={{ width: column.width }}
                  onClick={
                    column.sortable && onSort
                      ? () => onSort(column.key)
                      : undefined
                  }
                  sortable={column.sortable}
                  isActive={sortField === column.key}
                  sortDirection={
                    sortField === column.key
                      ? sortDirection === 'ASC'
                        ? 'asc'
                        : 'desc'
                      : undefined
                  }
                >
                  {column.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Tr key={item.id} onClick={() => handleRowClick(item.id)}>
                {columns.map((column) => (
                  <Td key={`${item.id}-${column.key}`}>
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {items.length === 0 && (
        <EmptyMessage>
          {isSearching
            ? `"${searchKeyword}"에 대한 검색 결과가 없습니다.`
            : emptyMessage}
        </EmptyMessage>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}

      {addActionUrl && (
        <AddButtonContainer>
          <AddButton onClick={() => navigate(addActionUrl)}>
            <PlusIcon>+</PlusIcon>
            <span>등록하기</span>
          </AddButton>
        </AddButtonContainer>
      )}
    </div>
  );
};

// 제목과 검색을 한 줄에 표시하기 위한 새로운 스타일 컴포넌트
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
  padding-bottom: 0.75rem;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const BoardTitle = styled.h1`
  margin: 0; // 마진 제거
  font-size: 1.8rem;
  padding-top: 10px;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};

  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

// 액션 섹션 스타일 수정
const ActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: #fff;
  text-align: center;
`;

interface ThProps {
  sortable?: boolean;
  isActive?: boolean;
  sortDirection?: 'asc' | 'desc';
}

const Th = styled.th<ThProps>`
  padding: 1.25rem 1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
  white-space: nowrap;
  position: relative;
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};

  ${(props) =>
    props.sortable &&
    `
    padding-right: 25px;
    
    &:hover {
      background-color: ${SEJONG_COLORS.COOL_GRAY}30;
    }
    
    &:after {
      content: '${
        !props.isActive ? '↕' : props.sortDirection === 'asc' ? '↑' : '↓'
      }';
      position: absolute;
      right: 8px;
      opacity: ${props.isActive ? 1 : 0.3};
    }
    
    &:hover:after {
      opacity: 1;
    }
  `}

  ${media.mobile} {
    padding: 1rem 0.75rem;
    font-size: 0.9rem;
  }
`;

const Td = styled.td`
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;

  ${media.mobile} {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 4px;
  font-size: 1rem;
  border: 1px solid #feb2b2;
`;

const SearchResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #4a5568;

  strong {
    color: #2d3748;
  }
`;

const Count = styled.span`
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
`;

const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: #2d3748;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-size: 1.1rem;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 1rem 0;
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const PlusIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default SearchableBoard;
