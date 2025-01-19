// src/hooks/queries/useProfessor.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { apiEndpoints } from '../../config/apiConfig';
import {
  Professor,
  ProfessorDetail,
  ProfessorRequest,
  ProfessorQueryParams,
  ProfessorListResponse,
  ProfessorDetailResponse,
  ProfessorCreateResponse,
  ProfessorUpdateResponse,
  ProfessorDeleteResponse,
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

// API Functions
const professorApi = {
  // 교수 목록 조회
  getProfessors: async ({
    page,
    size,
    sort,
  }: ProfessorQueryParams): Promise<ProfessorListResponse> => {
    const response = await axios.get(
      apiEndpoints.professor.listWithPage(page, size, sort),
    );
    return response.data;
  },

  // 교수 상세 정보 조회
  getProfessorById: async (id: number): Promise<ProfessorDetailResponse> => {
    const response = await axios.get(apiEndpoints.professor.detail(id));
    return response.data;
  },

  // 교수 정보 생성
  createProfessor: async (
    formData: FormData,
  ): Promise<ProfessorCreateResponse> => {
    const response = await axios.post(
      apiEndpoints.professor.create.url,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  },

  // 교수 정보 수정
  updateProfessor: async (
    id: number,
    formData: FormData,
  ): Promise<ProfessorUpdateResponse> => {
    const response = await axios.post(
      apiEndpoints.professor.update.url(id),
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  },

  // 교수 정보 삭제
  deleteProfessor: async (id: number): Promise<ProfessorDeleteResponse> => {
    const response = await axios.delete(apiEndpoints.professor.delete(id));
    return response.data;
  },
};

// Utils
export const createProfessorFormData = (
  professorData: ProfessorRequest,
  imageFile?: File | null,
): FormData => {
  const formData = new FormData();

  formData.append(
    'professorReqDto',
    new Blob([JSON.stringify(professorData)], {
      type: 'application/json',
    }),
  );

  if (imageFile) {
    formData.append('profileImage', imageFile);
  }

  return formData;
};

// Query Hooks
export const useProfessors = (params: ProfessorQueryParams) => {
  return useQuery<ProfessorListResponse, AxiosError>({
    queryKey: professorKeys.list(params),
    queryFn: () => professorApi.getProfessors(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useProfessorDetail = (id: number) => {
  return useQuery<ProfessorDetailResponse, AxiosError>({
    queryKey: professorKeys.detail(id),
    queryFn: () => professorApi.getProfessorById(id),
    enabled: !!id,
  });
};

// Mutation Hooks
export const useCreateProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation<ProfessorCreateResponse, AxiosError, FormData>({
    mutationFn: (formData) => professorApi.createProfessor(formData),
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
    ProfessorUpdateResponse,
    AxiosError,
    { id: number; formData: FormData }
  >({
    mutationFn: ({ id, formData }) =>
      professorApi.updateProfessor(id, formData),
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

  return useMutation<ProfessorDeleteResponse, AxiosError, number>({
    mutationFn: professorApi.deleteProfessor,
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
