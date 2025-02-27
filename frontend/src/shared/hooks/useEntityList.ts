// src/shared/hooks/useEntityList.ts
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { getErrorMessage } from '../utils/error/errorHandler';

interface EntityListParams {
  page: number;
  size: number;
  sortField?: string;
  sortDirection?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}

interface EntityListResult<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setSort: (field: string) => void;
  setSortDirection: (direction: 'ASC' | 'DESC') => void;
  setFilters: (filters: Record<string, any>) => void;
  refresh: () => void;
}

export function useEntityList<T>(
  fetchFunction: (params: EntityListParams) => Promise<{
    data: T[];
    totalPage: number;
    page: number;
  }>,
  initialParams: Partial<EntityListParams> = {},
): EntityListResult<T> {
  const [params, setParams] = useState<EntityListParams>({
    page: initialParams.page || 0, // API uses 0-based indexing
    size: initialParams.size || 10,
    sortField: initialParams.sortField,
    sortDirection: initialParams.sortDirection || 'DESC',
    filters: initialParams.filters || {},
  });

  const [data, setData] = useState<{
    items: T[];
    totalPages: number;
    currentPage: number;
  }>({
    items: [],
    totalPages: 0,
    currentPage: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch data when params change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchFunction(params);
        setData({
          items: response.data,
          totalPages: response.totalPage,
          currentPage: response.page,
        });
      } catch (err) {
        setError(getErrorMessage(err));
        console.error('Error fetching entity list:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params, fetchFunction]);

  // Handler functions
  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page: page - 1 })); // Convert to 0-based for API
  };

  const setSort = (field: string) => {
    setParams((prev) => {
      // Toggle direction if clicking the same field
      const direction =
        prev.sortField === field && prev.sortDirection === 'ASC'
          ? 'DESC'
          : 'ASC';

      return {
        ...prev,
        sortField: field,
        sortDirection: direction,
      };
    });
  };

  const setSortDirection = (direction: 'ASC' | 'DESC') => {
    setParams((prev) => ({ ...prev, sortDirection: direction }));
  };

  const setFilters = (filters: Record<string, any>) => {
    setParams((prev) => ({ ...prev, filters, page: 0 })); // Reset to first page when filtering
  };

  const refresh = () => {
    // Trigger a re-fetch with current params
    setParams((prev) => ({ ...prev }));
  };

  return {
    items: data.items,
    totalPages: data.totalPages,
    currentPage: data.currentPage + 1, // Convert to 1-based for UI
    isLoading,
    error,
    setPage,
    setSort,
    setSortDirection,
    setFilters,
    refresh,
  };
}
