import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { newsApi, NewsFormRequest } from '../../api/news';
import { apiEndpoints, axiosInstance } from '../../config/apiConfig';

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

export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: { page: number; size: number }) =>
    [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: number) => [...newsKeys.details(), id] as const,
};

export const useGetNewsList = (params: {
  page: number;
  size: number;
}): UseQueryResult<NewsListResponse, AxiosError> => {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: async () => {
      const response = await axiosInstance.get<NewsListResponse>(
        apiEndpoints.news.listWithPage(params.page, params.size),
      );
      return response.data;
    },
  });
};

export const useGetNews = (
  id: number,
): UseQueryResult<NewsItem, AxiosError> => {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: async () => {
      const response = await axiosInstance.get<NewsItem>(
        apiEndpoints.news.get(id),
      );
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateNews = (): UseMutationResult<
  number,
  AxiosError<{ message: string }>,
  {
    newsFormData: NewsFormRequest;
    imageFile?: File;
  }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newsFormData, imageFile }) => {
      const formData = new FormData();
      formData.append(
        'newsReqDto',
        new Blob([JSON.stringify(newsFormData)], {
          type: 'application/json',
        }),
      );

      if (imageFile) {
        formData.append('newsImage', imageFile);
      }

      const response = await axiosInstance.post<number>(
        apiEndpoints.news.create.url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
};

export const useUpdateNews = (): UseMutationResult<
  void,
  AxiosError,
  NewsFormRequest & { id: number }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsApi.updateNews,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: newsKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(apiEndpoints.news.delete(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
};
