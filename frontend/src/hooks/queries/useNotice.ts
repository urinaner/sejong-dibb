import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiConfig';
import type {
  NoticeQueryParams,
  NoticeRequest,
  NoticeListResponse,
  NoticeSingleResponse,
  NoticeCreateResponse,
  NoticeUpdateResponse,
  NoticeDeleteResponse,
} from '../../types/api/notice';

// Query Keys
export const noticeKeys = {
  all: ['notices'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (params: NoticeQueryParams) => [...noticeKeys.lists(), params] as const,
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

    const response = await axios.get<NoticeListResponse>(url);
    return response.data;
  },

  getById: async (id: number): Promise<NoticeSingleResponse> => {
    const response = await axios.get<NoticeSingleResponse>(
      apiEndpoints.board.get(id.toString()),
    );
    return response.data;
  },

  create: async ({
    data,
    files,
  }: {
    data: NoticeRequest;
    files?: File[];
  }): Promise<NoticeCreateResponse> => {
    const boardData = {
      ...data,
      departmentId: 1 as const, // 리터럴 타입으로 명시적 지정
    };

    const formData = apiEndpoints.board.create.getFormData(
      boardData,
      files || [],
    );
    const response = await axios.post(apiEndpoints.board.create.url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
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

    const response = await axios.post(
      apiEndpoints.board.update(id.toString()),
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  },

  delete: async (id: number): Promise<NoticeDeleteResponse> => {
    const response = await axios.delete(
      apiEndpoints.board.delete(id.toString()),
    );
    return response.data;
  },
};

// Custom Hooks
export const useGetNoticeList = (params: NoticeQueryParams) => {
  return useQuery({
    queryKey: noticeKeys.list(params),
    queryFn: () => noticeApi.getList(params),
  });
};

export const useGetNotice = (id: number) => {
  return useQuery({
    queryKey: noticeKeys.detail(id),
    queryFn: () => noticeApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: noticeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
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
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: noticeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() });
    },
  });
};

// Hook exports
const useNotice = {
  useGetNoticeList,
  useGetNotice,
  useCreateNotice,
  useUpdateNotice,
  useDeleteNotice,
};

export default useNotice;
