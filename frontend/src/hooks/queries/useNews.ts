import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../config/apiConfig';
import { apiEndpoints } from '../../config/apiConfig';
import type { NewsReqDto } from '../../config/apiConfig';

// Types
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  view: number;
  createDate: string;
  link: string;
  image: string;
}

export interface NewsListResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NewsItem[];
}

// Query Keys
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: { page: number; size: number }) =>
    [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: number) => [...newsKeys.details(), id] as const,
};

// API Functions
const newsApi = {
  getList: async ({ page, size }: { page: number; size: number }) => {
    try {
      const { data } = await axiosInstance.get(
        apiEndpoints.news.listWithPage(page, size),
      );
      return data;
    } catch (error) {
      console.error('Error fetching news list:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const { data } = await axiosInstance.get(apiEndpoints.news.get(id));
      return data;
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      throw error;
    }
  },

  create: async ({
    newsReqDto,
    imageFile,
  }: {
    newsReqDto: NewsReqDto;
    imageFile?: File;
  }) => {
    try {
      const formData = apiEndpoints.news.create.getFormData(
        newsReqDto,
        imageFile,
      );
      const { data } = await axiosInstance.post(
        apiEndpoints.news.create.url,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return data.data;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  update: async ({
    id,
    newsReqDto,
    imageFile,
  }: {
    id: number;
    newsReqDto: NewsReqDto;
    imageFile?: File;
  }) => {
    try {
      const formData = apiEndpoints.news.update.getFormData(
        newsReqDto,
        imageFile,
      );
      const { data } = await axiosInstance.put(
        apiEndpoints.news.update.url(id),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return data;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const { data } = await axiosInstance.delete(apiEndpoints.news.delete(id));
      return data;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  },
};

// Custom Hooks
export const useGetNewsList = (params: { page: number; size: number }) => {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => newsApi.getList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetNews = (id: number) => {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => newsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
    onError: (error) => {
      console.error('Error creating news:', error);
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newsApi.update,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
    onError: (error) => {
      console.error('Error updating news:', error);
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
    onError: (error) => {
      console.error('Error deleting news:', error);
    },
  });
};

// Hook exports
const useNews = {
  useGetNewsList,
  useGetNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
};

export default useNews;
