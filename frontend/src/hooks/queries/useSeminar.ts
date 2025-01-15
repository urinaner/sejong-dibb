// hooks/useSeminar.ts
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { apiEndpoints, SeminarDto } from '../../config/apiConfig';
import { SeminarResponse, SeminarFilter } from '../../types/api/seminar';

// Query Keys
export const seminarKeys = {
  all: ['seminar'] as const,
  lists: () => [...seminarKeys.all, 'list'] as const,
  list: (filters: SeminarFilter) => [...seminarKeys.lists(), filters] as const,
  details: () => [...seminarKeys.all, 'detail'] as const,
  detail: (id: number) => [...seminarKeys.details(), id] as const,
};

// GET - List Seminars with pagination
export const useSeminarList = (
  filter: SeminarFilter,
  options?: Omit<
    UseQueryOptions<
      SeminarResponse,
      Error,
      SeminarResponse,
      readonly unknown[]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<SeminarResponse, Error>({
    queryKey: seminarKeys.list(filter),
    queryFn: async () => {
      const response = await axios.get(
        apiEndpoints.seminar.listWithPage(
          filter.page,
          filter.size,
          filter.sortDirection,
        ),
      );
      return response.data;
    },
    ...options,
  });
};

// GET - Single Seminar
export const useSeminar = (
  id: number,
  options?: Omit<
    UseQueryOptions<SeminarDto, Error, SeminarDto, readonly unknown[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<SeminarDto, Error>({
    queryKey: seminarKeys.detail(id),
    queryFn: async () => {
      const response = await axios.get(apiEndpoints.seminar.get(id));
      return response.data;
    },
    ...options,
  });
};

// POST - Create Seminar
export const useCreateSeminar = () => {
  return useMutation({
    mutationFn: async (seminarDto: Omit<SeminarDto, 'id'>) => {
      const response = await axios.post(
        apiEndpoints.seminar.create,
        seminarDto,
      );
      return response.data;
    },
  });
};

// PUT - Update Seminar
export const useUpdateSeminar = () => {
  return useMutation({
    mutationFn: async ({ id, ...seminarDto }: SeminarDto) => {
      const response = await axios.put(
        apiEndpoints.seminar.update(id!),
        seminarDto,
      );
      return response.data;
    },
  });
};

// DELETE - Delete Seminar
export const useDeleteSeminar = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(apiEndpoints.seminar.delete(id));
      return response.data;
    },
  });
};

// Utils for invalidating queries
export const invalidateSeminarQueries = async (queryClient: any) => {
  await queryClient.invalidateQueries({ queryKey: seminarKeys.all });
};
