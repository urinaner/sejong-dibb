// src/shared/components/EntityTable/EntityTable.tsx
import React from 'react';
import DataTable, { Column, Action } from '../DataTable/DataTable';
import { useEntityList } from '../../hooks/useEntityList';

interface EntityTableProps<T, IdType = number | string> {
  entity: string;
  fetchFunction: (params: any) => Promise<any>;
  columns: Column<T>[];
  actions?: Action<T>[];
  onRowClick?: (item: T) => void;
  initialPage?: number;
  pageSize?: number;
  initialSortField?: string;
  initialSortDirection?: 'ASC' | 'DESC';
  keyExtractor?: (item: T) => string | number; // 타입 수정
  emptyMessage?: string;
}

function EntityTable<T extends { id?: IdType }, IdType = number | string>({
  entity,
  fetchFunction,
  columns,
  actions = [],
  onRowClick,
  initialPage = 1,
  pageSize = 10,
  initialSortField,
  initialSortDirection = 'DESC',
  keyExtractor = (item: T) => item.id as string | number, // 타입 수정
  emptyMessage,
}: EntityTableProps<T, IdType>) {
  const {
    items,
    totalPages,
    currentPage,
    isLoading,
    error,
    setPage,
    setSort,
    refresh,
  } = useEntityList<T>(fetchFunction, {
    page: initialPage - 1, // Convert to 0-based for API
    size: pageSize,
    sortField: initialSortField,
    sortDirection: initialSortDirection,
  });

  const defaultEmptyMessage = `등록된 ${entity} 데이터가 없습니다.`;

  return (
    <DataTable<T>
      columns={columns}
      data={items}
      isLoading={isLoading}
      error={error}
      emptyMessage={emptyMessage || defaultEmptyMessage}
      keyExtractor={keyExtractor}
      actions={actions}
      onRowClick={onRowClick}
      sortField={initialSortField}
      sortDirection={initialSortDirection}
      onSort={setSort}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}

export default EntityTable;
