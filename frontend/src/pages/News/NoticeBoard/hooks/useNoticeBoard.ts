import { useCallback, useEffect, useState } from 'react';
import { FilterState, NoticeState, ApiResponse } from '../types/notice.types';
import axios from 'axios';
import { apiEndpoints } from '../../../../config/apiConfig';

export const useNoticeBoard = () => {
  const [state, setState] = useState<NoticeState>({
    notices: [],
    loading: false,
    error: null,
    pageInfo: {
      currentPage: 0,
      totalPages: 0,
      size: 10,
    },
    filters: {
      category: 'all',
      sort: {
        field: 'createDate',
        direction: 'desc',
      },
      page: 0,
      size: 10,
    },
  });

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...newFilters,
      },
    }));
  }, []);

  const fetchNotices = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.get<ApiResponse>(
        state.filters.category === 'all'
          ? apiEndpoints.board.listWithPage(
              state.filters.page,
              state.filters.size,
            )
          : `${apiEndpoints.board.base}/category/${state.filters.category}?page=${state.filters.page}&size=${state.filters.size}`,
      );

      if (response.data?.data) {
        setState((prev) => ({
          ...prev,
          notices: response.data.data,
          pageInfo: {
            currentPage: response.data.page,
            totalPages: response.data.totalPage,
            size: prev.filters.size,
          },
          loading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: '게시글을 불러오는데 실패했습니다.',
        loading: false,
      }));
    }
  }, [state.filters]);

  useEffect(() => {
    fetchNotices();
  }, [state.filters]);

  return {
    ...state,
    updateFilters,
  };
};
