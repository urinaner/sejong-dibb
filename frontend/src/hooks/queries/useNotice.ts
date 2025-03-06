import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { apiEndpoints, axiosInstance } from '../../config/apiConfig';
import type {
  NoticeQueryParams,
  NoticeRequest,
  NoticeListResponse,
  NoticeSingleResponse,
  NoticeCreateResponse,
  NoticeUpdateResponse,
  NoticeDeleteResponse,
  NoticeSearchParams,
} from '../../types/api/notice';

// Query Keys
export const noticeKeys = {
  all: ['notices'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (params: NoticeQueryParams) => [...noticeKeys.lists(), params] as const,
  search: () => [...noticeKeys.all, 'search'] as const,
  searchResults: (params: NoticeSearchParams) =>
    [...noticeKeys.search(), params] as const,
  details: () => [...noticeKeys.all, 'detail'] as const,
  detail: (id: number) => [...noticeKeys.details(), id] as const,
};

// API Functions
const noticeApi = {
  getList: async (params: NoticeQueryParams): Promise<NoticeListResponse> => {
    const { category, page, size, sort, sortDirection } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (sort) queryParams.append('sort', sort);
    if (sortDirection) queryParams.append('sortDirection', sortDirection);

    const url =
      category && category !== 'all'
        ? `${apiEndpoints.board.getByCategory(category, page, size)}`
        : `${apiEndpoints.board.base}?${queryParams.toString()}`;

    const response = await axiosInstance.get<NoticeListResponse>(url);
    return response.data;
  },

  search: async (params: NoticeSearchParams): Promise<NoticeListResponse> => {
    try {
      const { keyword, page, size } = params;
      const queryParams = new URLSearchParams({
        keyword,
        page: (page || 0).toString(),
        size: (size || 10).toString(),
      });

      const response = await axiosInstance.get<NoticeListResponse>(
        `${apiEndpoints.board.search}?${queryParams.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error searching notices:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<NoticeSingleResponse> => {
    try {
      const response = await axiosInstance.get<NoticeSingleResponse>(
        apiEndpoints.board.get(id.toString()),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching notice by ID:', error);
      throw error;
    }
  },

  create: async ({
    data,
    files,
  }: {
    data: NoticeRequest;
    files?: File[];
  }): Promise<NoticeCreateResponse> => {
    try {
      const boardData = {
        ...data,
        departmentId: 1 as const,
      };

      const formData = apiEndpoints.board.create.getFormData(
        boardData,
        files || [],
      );
      const response = await axiosInstance.post(
        apiEndpoints.board.create.url,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating notice:', error);
      throw error;
    }
  },

  update: async ({
    id,
    data,
    files,
  }: {
    id: number;
    data: NoticeRequest;
    files?: File[];
  }): Promise<NoticeUpdateResponse> => {
    try {
      const boardData = {
        ...data,
        departmentId: 1 as const,
      };

      const formData = new FormData();
      formData.append(
        'boardReqDto',
        new Blob([JSON.stringify(boardData)], { type: 'application/json' }),
      );

      if (files) {
        files.forEach((file) => formData.append('boardFiles', file));
      }

      // multipart/form-data 설정과 함께 axiosInstance 사용
      const response = await axiosInstance.post(
        apiEndpoints.board.update(id.toString()),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization 헤더는 axiosInstance에 의해 자동으로 추가됨
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error updating notice:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<NoticeDeleteResponse> => {
    try {
      // axiosInstance 사용하여 자동으로 Authorization 헤더 포함
      const response = await axiosInstance.delete(
        apiEndpoints.board.delete(id.toString()),
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting notice:', error);
      throw error;
    }
  },
};

// Custom Hooks
export const useGetNoticeList = (params: NoticeQueryParams) => {
  return useQuery({
    queryKey: noticeKeys.list(params),
    queryFn: () => noticeApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchNotice = (params: NoticeSearchParams, options = {}) => {
  return useQuery({
    queryKey: noticeKeys.searchResults(params),
    queryFn: () => noticeApi.search(params),
    staleTime: 1 * 60 * 1000, // 1 minute for search results
    enabled: !!params.keyword,
    ...options,
  });
};

export const useGetNotice = (id: number) => {
  return useQuery({
    queryKey: noticeKeys.detail(id),
    queryFn: () => noticeApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: noticeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
    },
    onError: (error) => {
      console.error('Error creating notice:', error);
    },
  });
};

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: noticeApi.update,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
    },
    onError: (error) => {
      console.error('Error updating notice:', error);
    },
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: noticeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
    },
    onError: (error) => {
      console.error('Error deleting notice:', error);
    },
  });
};

// Hook exports
const useNotice = {
  useGetNoticeList,
  useSearchNotice,
  useGetNotice,
  useCreateNotice,
  useUpdateNotice,
  useDeleteNotice,
};

export default useNotice;
