// src/hooks/queries/useProfessor.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  apiEndpoints,
  axiosInstance,
  ProfessorReqDto,
} from '../../config/apiConfig';
import {
  Professor,
  ProfessorQueryParams,
  ProfessorListResponse,
  ProfessorDetailResponse,
} from '../../types/api/professor';

// Query Keys
const professorKeys = {
  all: ['professors'] as const,
  lists: () => [...professorKeys.all, 'list'] as const,
  list: (params: ProfessorQueryParams) =>
    [...professorKeys.lists(), params] as const,
  details: () => [...professorKeys.all, 'detail'] as const,
  detail: (id: number) => [...professorKeys.details(), id] as const,
} as const;

// Query Hooks
export const useProfessors = (params: ProfessorQueryParams) => {
  return useQuery<ProfessorListResponse, AxiosError>({
    queryKey: professorKeys.list(params),
    queryFn: async () => {
      const response = await axiosInstance.get<ProfessorListResponse>(
        apiEndpoints.professor.listWithPage(
          params.page,
          params.size,
          params.sort,
        ),
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });
};

export const useProfessorDetail = (id: number) => {
  return useQuery<ProfessorDetailResponse, AxiosError>({
    queryKey: professorKeys.detail(id),
    queryFn: async () => {
      const response = await axiosInstance.get<ProfessorDetailResponse>(
        apiEndpoints.professor.detail(id),
      );
      return response.data;
    },
    enabled: !!id,
  });
};

// 기존 helper 함수 제거하고 apiEndpoints의 getFormData 사용

// Mutation Hooks
export const useCreateProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation<
    number,
    AxiosError,
    { data: ProfessorReqDto; imageFile?: File | null }
  >({
    mutationFn: async ({ data, imageFile }) => {
      const formData = apiEndpoints.professor.create.getFormData(
        data,
        imageFile,
      );

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // 요청 전송
      const response = await axiosInstance.post<number>(
        apiEndpoints.professor.create.url,
        formData,
        config,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: professorKeys.lists(),
      });
    },
  });
};

export const useUpdateProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation<
    number,
    AxiosError,
    { id: number; data: ProfessorReqDto; imageFile?: File | null }
  >({
    mutationFn: async ({ id, data, imageFile }) => {
      const formData = apiEndpoints.professor.update.getFormData(
        data,
        imageFile,
      );

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axiosInstance.post<number>(
        apiEndpoints.professor.update.url(id),
        formData,
        config,
      );

      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: professorKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: professorKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation<number, AxiosError, number>({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete<number>(
        apiEndpoints.professor.delete(id),
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: professorKeys.lists(),
      });
    },
  });
};

// Error Utility
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  return 'An unexpected error occurred';
};
