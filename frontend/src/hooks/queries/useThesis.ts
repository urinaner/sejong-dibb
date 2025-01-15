import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiConfig';

// Query Keys
export const thesisKeys = {
  all: ['thesis'] as const,
  lists: () => [...thesisKeys.all, 'list'] as const,
  list: (filters: { page: number; size: number; sort?: string[] }) =>
    [...thesisKeys.lists(), filters] as const,
  details: () => [...thesisKeys.all, 'detail'] as const,
  detail: (id: string) => [...thesisKeys.details(), id] as const,
};

// Types
export interface ThesisItem {
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

// GET - List Thesis with pagination
export const useThesisList = (
  filter: ThesisFilter,
  options?: Omit<
    UseQueryOptions<ThesisResponse, Error, ThesisResponse, readonly unknown[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<ThesisResponse, Error>({
    queryKey: thesisKeys.list(filter),
    queryFn: async () => {
      const response = await axios.get(
        apiEndpoints.thesis.listWithPage(filter.page, filter.size, filter.sort),
      );
      return response.data;
    },
    ...options,
  });
};

// GET - Single Thesis
export const useThesis = (
  id: string,
  options?: UseQueryOptions<ThesisItem, Error, ThesisItem>,
) => {
  return useQuery<ThesisItem, Error>({
    queryKey: thesisKeys.detail(id),
    queryFn: async () => {
      const response = await axios.get(apiEndpoints.thesis.get(id));
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
      const response = await axios.post(
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
      const response = await axios.post(url, formData, {
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
      const response = await axios.delete(apiEndpoints.thesis.delete(id));
      return response.data;
    },
  });
};

// Utils for invalidating queries
export const invalidateThesisQueries = async (queryClient: any) => {
  await queryClient.invalidateQueries({ queryKey: thesisKeys.all });
};
