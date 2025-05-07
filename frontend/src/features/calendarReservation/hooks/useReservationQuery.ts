// src/features/calendarReservation/hooks/useReservationQuery.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Reservation, ReservationCreateDto } from '../types/reservation.types';
import { apiEndpoints, axiosInstance } from '../../../config/apiConfig';

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
    const response = await axiosInstance.get(
      apiEndpoints.reservation.monthlyList(roomId, yearMonth),
    );
    return response.data;
  },

  getDailyReservations: async (roomId: number, date: string) => {
    const response = await axiosInstance.get(
      apiEndpoints.reservation.dailyList(roomId, date),
    );
    return response.data;
  },

  createReservation: async (roomId: number, data: ReservationCreateDto) => {
    const formattedData = {
      ...data,
      startTime: format(new Date(data.startTime), 'yyyy-MM-dd HH:mm'),
      endTime: format(new Date(data.endTime), 'yyyy-MM-dd HH:mm'),
    };
    const response = await axiosInstance.post(
      apiEndpoints.reservation.create(roomId),
      formattedData,
    );
    return response.data;
  },

  updateReservation: async (
    roomId: number,
    reservationId: number,
    data: Partial<Reservation>,
  ) => {
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
    const response = await axiosInstance.put(
      apiEndpoints.reservation.update(roomId, reservationId),
      formattedData,
    );
    return response.data;
  },

  deleteReservation: async (roomId: number, reservationId: number) => {
    await axiosInstance.delete(
      apiEndpoints.reservation.delete(roomId, reservationId),
    );
  },
};

// React Query 훅
export const useReservationQuery = (roomId: number) => {
  const queryClient = useQueryClient();

  const useMonthlyReservations = (yearMonth: string) =>
    useQuery({
      queryKey: reservationKeys.monthly(roomId, yearMonth),
      queryFn: () => reservationApi.getMonthlyReservations(roomId, yearMonth),
    });

  const useDailyReservations = (date: string) =>
    useQuery({
      queryKey: reservationKeys.daily(roomId, date),
      queryFn: () => reservationApi.getDailyReservations(roomId, date),
    });

  const useCreateReservation = () =>
    useMutation({
      mutationFn: (data: ReservationCreateDto) =>
        reservationApi.createReservation(roomId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      },
    });

  const useUpdateReservation = () =>
    useMutation({
      mutationFn: ({
        reservationId,
        data,
      }: {
        reservationId: number;
        data: Partial<Reservation>;
      }) => reservationApi.updateReservation(roomId, reservationId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reservationKeys.all }); // ✅ 수정됨
      },
    });

  const useDeleteReservation = () =>
    useMutation({
      mutationFn: (reservationId: number) =>
        reservationApi.deleteReservation(roomId, reservationId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reservationKeys.all }); // ✅ 수정됨
      },
    });

  return {
    useMonthlyReservations,
    useDailyReservations,
    useCreateReservation,
    useUpdateReservation,
    useDeleteReservation,
  };
};
