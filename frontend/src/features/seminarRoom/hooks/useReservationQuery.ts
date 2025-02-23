// src/hooks/queries/useReservationQuery.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationApi } from '../api/reservationApi';
import type { Reservation } from '../types/reservation.types';
import { format } from 'date-fns';

export const reservationKeys = {
  all: ['reservations'] as const,
  monthly: (roomId: number, yearMonth: string) =>
    [...reservationKeys.all, 'monthly', roomId, yearMonth] as const,
  daily: (roomId: number, date: string) =>
    [...reservationKeys.all, 'daily', roomId, date] as const,
  detail: (roomId: number, reservationId: number) =>
    [...reservationKeys.all, 'detail', roomId, reservationId] as const,
};

export const useReservationQuery = (roomId: number) => {
  const queryClient = useQueryClient();

  // 월별 예약 조회
  const useMonthlyReservations = (yearMonth: string) =>
    useQuery({
      queryKey: reservationKeys.monthly(roomId, yearMonth),
      queryFn: () => reservationApi.getMonthlyReservations(roomId, yearMonth),
    });

  // 일별 예약 조회
  const useDailyReservations = (date: string) =>
    useQuery({
      queryKey: reservationKeys.daily(roomId, date),
      queryFn: () => reservationApi.getDailyReservations(roomId, date),
    });

  // 예약 생성
  const useCreateReservation = () =>
    useMutation({
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

  // 예약 수정
  const useUpdateReservation = () =>
    useMutation({
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

  // 예약 삭제
  const useDeleteReservation = () =>
    useMutation({
      mutationFn: (reservationId: number) =>
        reservationApi.deleteReservation(roomId, reservationId),
      onSuccess: () => {
        const currentYearMonth = format(new Date(), 'yyyy-MM');
        queryClient.invalidateQueries({
          queryKey: reservationKeys.monthly(roomId, currentYearMonth),
        });
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
