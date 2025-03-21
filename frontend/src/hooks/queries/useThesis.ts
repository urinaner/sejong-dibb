import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  apiEndpoints,
  axiosInstance,
  publicAxiosInstance,
} from '../../config/apiConfig';
// Query Keys
export const thesisKeys = {
  all: ['thesis'] as const,
  lists: () => [...thesisKeys.all, 'list'] as const,
  list: (filters: { page: number; size: number; sort?: string[] }) =>
    [...thesisKeys.lists(), filters] as const,
  details: () => [...thesisKeys.all, 'detail'] as const,
  detail: (id: string) => [...thesisKeys.details(), id] as const,
  search: () => [...thesisKeys.all, 'search'] as const,
  searchResults: (params: ThesisSearchParams) =>
    [...thesisKeys.search(), params] as const,
};

// Types
export interface ThesisItem {
  title: string;
  id: number;
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
  thesisImage: string;
  publicationCollection: string;
  publicationIssue: string;
  publicationPage: string;
  issn: string;
  professorId: number;
}

export interface ThesisResponse {
  message: string;
  page: number;
  totalPage: number;
  data: ThesisItem[];
}

export interface ThesisFilter {
  page: number;
  size: number;
  sort?: string[];
}

export interface ThesisSearchParams {
  keyword: string;
  page: number;
  size: number;
}

// GET - List Thesis with pagination
export const useThesisList = (
  filter: ThesisFilter,
  options?: Omit<
    UseQueryOptions<
      ThesisResponse,
      AxiosError,
      ThesisResponse,
      readonly unknown[]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<ThesisResponse, AxiosError>({
    queryKey: thesisKeys.list(filter),
    queryFn: async () => {
      const response = await axiosInstance.get(
        apiEndpoints.thesis.listWithPage(filter.page, filter.size, filter.sort),
      );
      return response.data;
    },
    ...options,
  });
};

// GET - Search Thesis
export const useSearchThesis = (
  params: ThesisSearchParams,
  options?: Omit<
    UseQueryOptions<
      ThesisResponse,
      AxiosError,
      ThesisResponse,
      readonly unknown[]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<ThesisResponse, AxiosError>({
    queryKey: thesisKeys.searchResults(params),
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        keyword: params.keyword,
        page: params.page.toString(),
        size: params.size.toString(),
      });
      const response = await axiosInstance.get(
        `${apiEndpoints.thesis.search}?${queryParams.toString()}`,
      );
      return response.data;
    },
    enabled: !!params.keyword,
    ...options,
  });
};

// GET - Single Thesis
export const useThesis = (
  id: string,
  options?: Omit<
    UseQueryOptions<ThesisItem, AxiosError, ThesisItem, readonly unknown[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<ThesisItem, AxiosError>({
    queryKey: thesisKeys.detail(id),
    queryFn: async () => {
      const response = await axiosInstance.get(apiEndpoints.thesis.get(id));
      return response.data;
    },
    ...options,
  });
};

// POST - Create Thesis
export const useCreateThesis = () => {
  return useMutation({
    mutationFn: async ({
      thesisReqDto,
      imageFile,
    }: {
      thesisReqDto: Omit<ThesisItem, 'id'>;
      imageFile?: File | null;
    }) => {
      const formData = apiEndpoints.thesis.create.getFormData(
        thesisReqDto,
        imageFile,
      );
      const response = await axiosInstance.post(
        apiEndpoints.thesis.create.url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    },
  });
};

// POST - Update Thesis
export const useUpdateThesis = () => {
  return useMutation({
    mutationFn: async ({
      id,
      thesisReqDto,
      imageFile,
    }: {
      id: string;
      thesisReqDto: Omit<ThesisItem, 'id'>;
      imageFile?: File | null;
    }) => {
      const formData = apiEndpoints.thesis.update.getFormData(
        thesisReqDto,
        imageFile,
      );
      const updateUrl = apiEndpoints.thesis.update.url;
      const url = typeof updateUrl === 'function' ? updateUrl(id) : updateUrl;
      const response = await axiosInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });
};

// DELETE - Delete Thesis
export const useDeleteThesis = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(
        apiEndpoints.thesis.delete(id),
      );
      return response.data;
    },
  });
};

// Utils for invalidating queries
export const invalidateThesisQueries = async (queryClient: any) => {
  await queryClient.invalidateQueries({ queryKey: thesisKeys.all });
};
