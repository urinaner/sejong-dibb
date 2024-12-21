import { useCallback, useEffect, useState } from 'react';
import {
  FilterState,
  NoticeState,
  ApiResponse,
  SortField,
} from '../types/notice.types';
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
      // URL 파라미터 구성 - 정렬 가능한 필드만 전송
      const params = new URLSearchParams({
        page: state.filters.page.toString(),
        size: state.filters.size.toString(),
      });

      // 정렬 필드가 허용된 도메인 값인 경우에만 파라미터 추가
      const allowedSortFields: SortField[] = [
        'title',
        'content',
        'writer',
        'viewCount',
      ];

      if (allowedSortFields.includes(state.filters.sort.field)) {
        params.append('sort', state.filters.sort.field);
        params.append('sortDirection', state.filters.sort.direction);
      }

      const response = await axios.get<ApiResponse>(
        state.filters.category === 'all'
          ? `${apiEndpoints.board.base}?${params}`
          : `${apiEndpoints.board.base}/category/${state.filters.category}?${params}`,
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
