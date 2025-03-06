import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, apiEndpoints } from '../../config/apiConfig';

// 타입 정의
export interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  createDate: string;
  view: number;
  link?: string;
}

export interface NewsListResponse {
  message?: string;
  page: number;
  totalPage: number;
  data: News[];
}

export interface NewsSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

export interface NewsQueryParams {
  page: number;
  size: number;
  sort?: string;
  sortDirection?: string;
}

// Query Keys
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: NewsQueryParams) => [...newsKeys.lists(), params] as const,
  search: () => [...newsKeys.all, 'search'] as const,
  searchResults: (params: NewsSearchParams) =>
    [...newsKeys.search(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: number) => [...newsKeys.details(), id] as const,
};

// API 함수
const getNewsList = async (
  params: NewsQueryParams,
): Promise<NewsListResponse> => {
  try {
    const { page, size } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    // 정렬 기능 임시 비활성화 (백엔드 지원 시 주석 해제)
    // if (sort) queryParams.append('sort', sort);
    // if (sortDirection) queryParams.append('sortDirection', sortDirection);

    // apiEndpoints 사용
    const response = await axiosInstance.get<NewsListResponse>(
      `${apiEndpoints.news.listWithPage(page, size)}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news list:', error);
    throw error;
  }
};

const searchNews = async (
  params: NewsSearchParams,
): Promise<NewsListResponse> => {
  try {
    const { keyword, page, size } = params;
    const queryParams = new URLSearchParams({
      keyword,
      page: (page || 0).toString(),
      size: (size || 10).toString(),
    });

    // apiEndpoints 사용
    const response = await axiosInstance.get<NewsListResponse>(
      `${apiEndpoints.news.search}?${queryParams.toString()}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

const getNewsById = async (id: number): Promise<News> => {
  try {
    // apiEndpoints 사용
    const response = await axiosInstance.get<News>(apiEndpoints.news.get(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw error;
  }
};

const createNews = async (newsData: FormData): Promise<any> => {
  try {
    // apiEndpoints 사용
    const response = await axiosInstance.post(
      apiEndpoints.news.create.url,
      newsData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
};

const updateNews = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}): Promise<any> => {
  try {
    // apiEndpoints 사용
    const response = await axiosInstance.put(
      apiEndpoints.news.update.url(id),
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

const deleteNews = async (id: number): Promise<any> => {
  try {
    // apiEndpoints 사용
    const response = await axiosInstance.delete(apiEndpoints.news.delete(id));
    return response.data;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
};

// Custom Hooks
export const useGetNewsList = (params: NewsQueryParams) => {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => getNewsList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchNews = (params: NewsSearchParams, options = {}) => {
  return useQuery({
    queryKey: newsKeys.searchResults(params),
    queryFn: () => searchNews(params),
    staleTime: 1 * 60 * 1000, // 1 minute for search results
    enabled: !!params.keyword,
    ...options,
  });
};

export const useGetNewsById = (id: number) => {
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => getNewsById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNews,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
    },
  });
};

export default {
  useGetNewsList,
  useSearchNews,
  useGetNewsById,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
};
