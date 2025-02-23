import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationApi } from '../api/reservationApi';
import useReservationStore from '../store/reservationStore';
import { format } from 'date-fns';
import { Reservation } from '../types/reservation.types';
import React from 'react';

export const useReservation = (roomId: number) => {
  const queryClient = useQueryClient();
  const { setError, setLoading } = useReservationStore();

  const getMonthlyReservations = useQuery({
    queryKey: ['reservations', 'monthly', roomId],
    queryFn: async () => {
      const yearMonth = format(new Date(), 'yyyy-MM');
      return reservationApi.getMonthlyReservations(roomId, yearMonth);
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: (data: Omit<Reservation, 'id'>) =>
      reservationApi.createReservation(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservations'],
      });
    },
  });

  // 에러 처리를 useEffect로 이동
  React.useEffect(() => {
    if (getMonthlyReservations.error) {
      setError(getMonthlyReservations.error.message);
    }
    if (createReservationMutation.error) {
      setError(createReservationMutation.error.message);
    }
  }, [getMonthlyReservations.error, createReservationMutation.error, setError]);

  return {
    getMonthlyReservations,
    createReservation: createReservationMutation.mutate,
    isLoading:
      getMonthlyReservations.isPending || createReservationMutation.isPending,
  };
};
