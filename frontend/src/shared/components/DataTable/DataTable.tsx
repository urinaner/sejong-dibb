// src/shared/components/DataTable/DataTable.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../../common/Pagination/Pagination';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  showCondition?: (item: T) => boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  keyExtractor: (item: T) => string | number;
  actions?: Action<T>[];
  onRowClick?: (item: T) => void;
  sortField?: string;
  sortDirection?: 'ASC' | 'DESC';
  onSort?: (field: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

function DataTable<T>({
  columns,
  data,
  isLoading = false,
  error = null,
  emptyMessage = '데이터가 없습니다.',
  keyExtractor,
  actions = [],
  onRowClick,
  sortField,
  sortDirection = 'ASC',
  onSort,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: DataTableProps<T>) {
  const handleHeaderClick = (column: Column<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key as string);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="데이터를 불러오는 중입니다..." />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (data.length === 0) {
    return <EmptyMessage>{emptyMessage}</EmptyMessage>;
  }

  return (
    <>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <Th
                  key={column.key as string}
                  onClick={() => handleHeaderClick(column)}
                  sortable={column.sortable}
                  isActive={sortField === column.key}
                  sortDirection={
                    sortField === column.key
                      ? (sortDirection.toLowerCase() as 'asc' | 'desc')
                      : undefined
                  }
                  width={column.width}
                >
                  {column.header}
                </Th>
              ))}
              {actions.length > 0 && <Th width="80px">관리</Th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <Tr
                key={keyExtractor(item)}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                clickable={!!onRowClick}
              >
                {columns.map((column) => (
                  <Td key={column.key as string}>
                    {column.render
                      ? column.render(item)
                      : (item[column.key as keyof T] as React.ReactNode)}
                  </Td>
                ))}
                {actions.length > 0 && (
                  <ActionTd>
                    {actions
                      .filter(
                        (action) =>
                          !action.showCondition || action.showCondition(item),
                      )
                      .map((action, idx) => (
                        <ActionButton
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(item);
                          }}
                        >
                          {action.icon} {!action.icon && action.label}
                        </ActionButton>
                      ))}
                  </ActionTd>
                )}
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      {totalPages > 1 && onPageChange && (
        <PaginationWrapper>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </PaginationWrapper>
      )}
    </>
  );
}

// Styled components
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th<{
  sortable?: boolean;
  isActive?: boolean;
  sortDirection?: 'asc' | 'desc';
  width?: string;
}>`
  width: ${(props) => props.width || 'auto'};
  padding: 1.25rem 1rem;
  background-color: #f8f9fa;
  color: #4a5568;
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  position: relative;
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};

  ${(props) =>
    props.sortable &&
    `
    &:hover {
      background-color: #edf2f7;
    }
    
    &:after {
      content: '${
        props.isActive ? (props.sortDirection === 'asc' ? '↑' : '↓') : '↕'
      }';
      position: absolute;
      right: 8px;
      opacity: ${props.isActive ? 1 : 0.3};
    }
  `}
`;

const Tr = styled.tr<{ clickable: boolean }>`
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f7fafc;
  }
`;

const Td = styled.td`
  padding: 1.25rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
`;

const ActionTd = styled(Td)`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 8px;
  border: 1px solid #feb2b2;
  font-weight: 500;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #4a5568;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 1.1rem;
`;

export default DataTable;
