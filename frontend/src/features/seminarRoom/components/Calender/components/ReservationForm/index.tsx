import React from 'react';
import { format } from 'date-fns';
import { Modal, useModal } from '../../../../../../components/Modal';
import useReservationStore from '../../../../store/reservationStore';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import type { Reservation } from '../../../../types/reservation.types';
import {
  FormContainer,
  FormField,
  Input,
  Select,
  SubmitButton,
} from './ReservationFormStyle';

interface ReservationFormProps {
  roomId: number;
}

function ReservationForm({ roomId }: ReservationFormProps) {
  const { closeModal } = useModal();
  const { selectedDate } = useReservationStore();
  const { useCreateReservation, useMonthlyReservations, useDailyReservations } =
    useReservationQuery(roomId);

  const createReservation = useCreateReservation();
  const { refetch: refetchMonthly } = useMonthlyReservations(
    format(selectedDate, 'yyyy-MM'),
  );
  const { refetch: refetchDaily } = useDailyReservations(
    format(selectedDate, 'yyyy-MM-dd'),
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const reservationData = {
      startTime: `${format(selectedDate, 'yyyy-MM-dd')} ${formData.get('startTime')}`,
      endTime: `${format(selectedDate, 'yyyy-MM-dd')} ${formData.get('endTime')}`,
      purpose: formData.get('purpose') as Reservation['purpose'],
      etc: formData.get('etc') as string,
      userId: 1, // 현재 로그인한 사용자 ID
      status: 'PENDING' as const, // 초기 상태
    };

    try {
      await createReservation.mutateAsync(reservationData);
      closeModal();
      refetchMonthly();
      refetchDaily();
    } catch (error) {
      console.error('Failed to create reservation:', error);
    }
  };

  return (
    <>
      <Modal.Header>새 예약 생성</Modal.Header>
      <Modal.Content>
        <FormContainer onSubmit={handleSubmit}>
          <FormField>
            <label>날짜</label>
            <Input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              readOnly
            />
          </FormField>
          <FormField>
            <label>시작 시간</label>
            <Input type="time" name="startTime" required />
          </FormField>
          <FormField>
            <label>종료 시간</label>
            <Input type="time" name="endTime" required />
          </FormField>
          <FormField>
            <label>목적</label>
            <Select name="purpose" required>
              <option value="SEMINAR">세미나</option>
              <option value="CLASS">수업</option>
              <option value="MEETING">회의</option>
              <option value="OTHER">기타</option>
            </Select>
          </FormField>
          <FormField>
            <label>비고</label>
            <Input type="text" name="etc" />
          </FormField>
          <SubmitButton type="submit">예약하기</SubmitButton>
        </FormContainer>
      </Modal.Content>
    </>
  );
}

export default ReservationForm;
