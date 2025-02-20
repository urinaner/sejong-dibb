import React, { useState } from 'react';
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
  ButtonGroup,
  ModalHeader,
} from '../../CalendarStyle';

interface ReservationFormProps {
  roomId: number;
  preselectedDate?: Date;
}

function ReservationForm({ roomId, preselectedDate }: ReservationFormProps) {
  const { closeModal } = useModal();
  const { selectedDate } = useReservationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use preselectedDate if provided, otherwise use store's selectedDate
  const dateToUse = preselectedDate || selectedDate;

  const { useCreateReservation, useMonthlyReservations, useDailyReservations } =
    useReservationQuery(roomId);

  const createReservation = useCreateReservation();
  const { refetch: refetchMonthly } = useMonthlyReservations(
    format(dateToUse, 'yyyy-MM'),
  );
  const { refetch: refetchDaily } = useDailyReservations(
    format(dateToUse, 'yyyy-MM-dd'),
  );

  const validateForm = (formData: FormData) => {
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;

    if (!startTime || !endTime) {
      return '시작 시간과 종료 시간을 입력해주세요.';
    }

    if (startTime >= endTime) {
      return '종료 시간은 시작 시간보다 늦어야 합니다.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const validationError = validateForm(formData);

    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    const reservationData = {
      startTime: `${format(dateToUse, 'yyyy-MM-dd')} ${formData.get('startTime')}`,
      endTime: `${format(dateToUse, 'yyyy-MM-dd')} ${formData.get('endTime')}`,
      purpose: formData.get('purpose') as Reservation['purpose'],
      etc: formData.get('etc') as string,
      userId: 0, // 필요한 필드 추가
      status: 'PENDING' as const, // 필요한 필드 추가
    };

    try {
      await createReservation.mutateAsync(reservationData);
      refetchMonthly();
      refetchDaily();
      closeModal();
    } catch (error) {
      console.error('Failed to create reservation:', error);
      setError('예약 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalHeader>새 예약 생성</ModalHeader>
      <Modal.Content>
        <FormContainer onSubmit={handleSubmit}>
          <FormField>
            <label>날짜</label>
            <Input
              type="date"
              value={format(dateToUse, 'yyyy-MM-dd')}
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
              <option value="">선택해주세요</option>
              <option value="SEMINAR">세미나</option>
              <option value="CLASS">수업</option>
              <option value="MEETING">회의</option>
              <option value="OTHER">기타</option>
            </Select>
          </FormField>

          <FormField>
            <label>비고</label>
            <Input
              type="text"
              name="etc"
              placeholder="추가 정보를 입력해주세요 (선택사항)"
            />
          </FormField>

          {error && (
            <div
              style={{
                padding: '10px',
                backgroundColor: '#feedef',
                color: '#d32f2f',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {error}
            </div>
          )}

          <ButtonGroup>
            <button
              type="button"
              onClick={closeModal}
              style={{
                padding: '10px 24px',
                backgroundColor: 'transparent',
                color: '#5f6368',
                border: '1px solid #dadce0',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              취소
            </button>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '처리 중...' : '예약하기'}
            </SubmitButton>
          </ButtonGroup>
        </FormContainer>
      </Modal.Content>
    </>
  );
}

export default ReservationForm;
