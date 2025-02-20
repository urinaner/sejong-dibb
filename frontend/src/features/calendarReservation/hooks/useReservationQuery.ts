// src/features/calendarReservation/hooks/useReservationQuery.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Reservation } from '../types/reservation.types';
import axios from 'axios';

const API_BASE_URL = '/api/room';

export const reservationKeys = {
  all: ['reservations'] as const,
  monthly: (roomId: number, yearMonth: string) =>
    [...reservationKeys.all, 'monthly', roomId, yearMonth] as const,
  daily: (roomId: number, date: string) =>
    [...reservationKeys.all, 'daily', roomId, date] as const,
  detail: (roomId: number, reservationId: number) =>
    [...reservationKeys.all, 'detail', roomId, reservationId] as const,
};

// API 클라이언트 함수들
const reservationApi = {
  getMonthlyReservations: async (roomId: number, yearMonth: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/${roomId}/reservation/month`,
      {
        params: { yearMonth },
      },
    );
    return response.data;
  },

  getDailyReservations: async (roomId: number, date: string) => {
    const response = await axios.get(`${API_BASE_URL}/${roomId}/reservation`, {
      params: { date },
    });
    return response.data;
  },

  createReservation: async (roomId: number, data: Omit<Reservation, 'id'>) => {
    // 날짜 포맷 변환 (ISO 포맷 -> API 요청 포맷)
    const formattedData = {
      ...data,
      startTime: format(new Date(data.startTime), 'yyyy-MM-dd HH:mm'),
      endTime: format(new Date(data.endTime), 'yyyy-MM-dd HH:mm'),
    };

    const response = await axios.post(
      `${API_BASE_URL}/${roomId}/reservation`,
      formattedData,
    );
    return response.data;
  },

  updateReservation: async (
    roomId: number,
    reservationId: number,
    data: Partial<Reservation>,
  ) => {
    // 날짜 필드가 있다면 포맷 변환
    const formattedData = { ...data };
    if (formattedData.startTime) {
      formattedData.startTime = format(
        new Date(formattedData.startTime),
        'yyyy-MM-dd HH:mm',
      );
    }
    if (formattedData.endTime) {
      formattedData.endTime = format(
        new Date(formattedData.endTime),
        'yyyy-MM-dd HH:mm',
      );
    }

    const response = await axios.put(
      `${API_BASE_URL}/${roomId}/reservation/${reservationId}`,
      formattedData,
    );
    return response.data;
  },

  deleteReservation: async (roomId: number, reservationId: number) => {
    await axios.delete(
      `${API_BASE_URL}/${roomId}/reservation/${reservationId}`,
    );
  },
};

export const useReservationQuery = (roomId: number) => {
  const queryClient = useQueryClient();

  // 월별 예약 조회
  const useMonthlyReservations = (yearMonth: string) => {
    return {
      data: [],
      refetch: () => Promise.resolve({ data: [] }),
    };

    // 실제 API 구현 시 아래 코드 활성화
    /*
    return useQuery({
      queryKey: reservationKeys.monthly(roomId, yearMonth),
      queryFn: () => reservationApi.getMonthlyReservations(roomId, yearMonth),
    });
    */
  };

  // 일별 예약 조회
  const useDailyReservations = (date: string) => {
    return {
      data: [],
      isLoading: false,
      refetch: () => Promise.resolve({ data: [] }),
    };

    // 실제 API 구현 시 아래 코드 활성화
    /*
    return useQuery({
      queryKey: reservationKeys.daily(roomId, date),
      queryFn: () => reservationApi.getDailyReservations(roomId, date),
    });
    */
  };

  // 예약 생성
  const useCreateReservation = () => {
    return {
      mutateAsync: (data: Omit<Reservation, 'id'>) => Promise.resolve(data),
    };

    // 실제 API 구현 시 아래 코드 활성화
    /*
    return useMutation({
      mutationFn: (data: Omit<Reservation, 'id'>) =>
        reservationApi.createReservation(roomId, data),
      onSuccess: () => {
        // 현재 월의 데이터 무효화
        const currentYearMonth = format(new Date(), 'yyyy-MM');
        queryClient.invalidateQueries({
          queryKey: reservationKeys.monthly(roomId, currentYearMonth),
        });
      },
    });
    */
  };

  // 예약 수정
  const useUpdateReservation = () => {
    return {
      mutateAsync: ({
        reservationId,
        data,
      }: {
        reservationId: number;
        data: Partial<Reservation>;
      }) => Promise.resolve(data),
    };

    // 실제 API 구현 시 아래 코드 활성화
    /*
    return useMutation({
      mutationFn: ({
        reservationId,
        data,
      }: {
        reservationId: number;
        data: Partial<Reservation>;
      }) => reservationApi.updateReservation(roomId, reservationId, data),
      onSuccess: (_, variables) => {
        // 관련된 쿼리들 무효화
        const currentYearMonth = format(new Date(), 'yyyy-MM');
        queryClient.invalidateQueries({
          queryKey: reservationKeys.monthly(roomId, currentYearMonth),
        });
      },
    });
    */
  };

  // 예약 삭제
  const useDeleteReservation = () => {
    return {
      mutateAsync: (reservationId: number) => Promise.resolve(),
    };

    // 실제 API 구현 시 아래 코드 활성화
    /*
    return useMutation({
      mutationFn: (reservationId: number) =>
        reservationApi.deleteReservation(roomId, reservationId),
      onSuccess: () => {
        const currentYearMonth = format(new Date(), 'yyyy-MM');
        queryClient.invalidateQueries({
          queryKey: reservationKeys.monthly(roomId, currentYearMonth),
        });
      },
    });
    */
  };

  return {
    useMonthlyReservations,
    useDailyReservations,
    useCreateReservation,
    useUpdateReservation,
    useDeleteReservation,
  };
};
