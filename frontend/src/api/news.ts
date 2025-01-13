import axios from 'axios';
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import type {
  NewsRequest,
  NewsResponse,
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
} from '../types';
import { apiEndpoints } from '../config/apiConfig';

const API_URL = process.env.REACT_APP_API_URL;

export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: PaginationParams) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: number) => [...newsKeys.details(), id] as const,
};

// API 함수들
export const getNews = async (id: number): Promise<NewsResponse> => {
  const { data } = await axios.get<ApiResponse<NewsResponse>>(
    `${API_URL}/api/news/${id}`,
  );
  return data.data;
};

export const getNewsList = async ({
  page,
  size,
}: PaginationParams): Promise<PaginatedResponse<NewsResponse>> => {
  const { data } = await axios.get<
    ApiResponse<PaginatedResponse<NewsResponse>>
  >(`${API_URL}/api/news`, {
    params: { page, size },
  });
  return data.data;
};

export const createNews = async (newsData: NewsRequest): Promise<number> => {
  const formData = new FormData();
  formData.append(
    'newsReqDto',
    new Blob([JSON.stringify(newsData)], { type: 'application/json' }),
  );

  if (newsData.image) {
    formData.append('news_image', newsData.image);
  }

  const { data } = await axios.post<ApiResponse<number>>(
    `${API_URL}/api/news`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return data.data;
};

export const updateNews = async ({
  id,
  ...newsData
}: NewsRequest & { id: number }): Promise<void> => {
  const formData = new FormData();
  formData.append(
    'newsReqDto',
    new Blob([JSON.stringify(newsData)], { type: 'application/json' }),
  );

  if (newsData.image) {
    formData.append('news_image', newsData.image);
  }

  await axios.post(`${API_URL}/api/news/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteNews = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/api/news/${id}`);
};

// React Query Hooks
export const useGetNews = (id: number): UseQueryResult<NewsResponse> => {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => getNews(id),
  });
};

export const useGetNewsList = (params: PaginationParams) => {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: async () => {
      const response = await fetch(
        apiEndpoints.news.listWithPage(params.page, params.size),
      );
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data: NewsResponse = await response.json();
      return {
        data: data.data,
        totalPages: data.totalPage,
        page: data.page,
      };
    },
  });
};

export const useCreateNews = (): UseMutationResult<
  number,
  Error,
  NewsRequest
> => {
  return useMutation({
    mutationFn: createNews,
  });
};

export const useUpdateNews = (): UseMutationResult<
  void,
  Error,
  NewsRequest & { id: number }
> => {
  return useMutation({
    mutationFn: updateNews,
  });
};

export const useDeleteNews = (): UseMutationResult<void, Error, number> => {
  return useMutation({
    mutationFn: deleteNews,
  });
};
