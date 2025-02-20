import React, { useState } from 'react';
import styled from 'styled-components';
import { format, addHours } from 'date-fns';
import { Modal, useModal } from '../../../../../../components/Modal';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import {
  Reservation,
  ReservationStatus,
} from '../../../../types/reservation.types';
import useReservationStore from '../../../../store/reservationStore';

const FormContainer = styled.form`
  padding: 0 24px 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 1px #1a73e8;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 1px #1a73e8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: #5f6368;
  border: 1px solid #dadce0;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const SaveButton = styled(Button)`
  background-color: #1a73e8;
  color: white;
  border: none;

  &:hover {
    background-color: #1766ca;
    box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3);
  }

  &:disabled {
    background-color: #a8c7fa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #d93025;
  font-size: 12px;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #fce8e6;
  border-radius: 4px;
`;

interface ReservationFormProps {
  roomId: number;
  startTime?: string;
  endTime?: string;
  reservation?: Reservation;
  onSave: (reservation: Reservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  roomId,
  startTime,
  endTime,
  reservation,
  onSave,
}) => {
  const { closeModal } = useModal();
  const { useCreateReservation, useUpdateReservation } =
    useReservationQuery(roomId);
  const createReservation = useCreateReservation();
  const updateReservation = useUpdateReservation();
  const { selectedDate, setError: setStoreError } = useReservationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 기본값 설정
  const initialDate = startTime
    ? format(new Date(startTime), 'yyyy-MM-dd')
    : format(selectedDate, 'yyyy-MM-dd');

  const initialStartTime = startTime
    ? format(new Date(startTime), 'HH:mm')
    : format(new Date(), 'HH:mm');

  const initialEndTime = endTime
    ? format(new Date(endTime), 'HH:mm')
    : format(
        addHours(new Date(initialDate + 'T' + initialStartTime), 1),
        'HH:mm',
      );

  const [formData, setFormData] = useState({
    date: initialDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    purpose: reservation?.purpose || 'MEETING',
    etc: reservation?.etc || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) {
      return '날짜와 시간을 모두 입력해주세요.';
    }

    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(`${formData.date}T${formData.endTime}`);

    if (start >= end) {
      return '종료 시간은 시작 시간보다 늦어야 합니다.';
    }

    if (start < new Date()) {
      return '과거 시간에는 예약할 수 없습니다.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const reservationStatus: ReservationStatus = 'PENDING';
      const now = new Date().toISOString();

      const data = {
        startTime: `${formData.date}T${formData.startTime}:00`,
        endTime: `${formData.date}T${formData.endTime}:00`,
        purpose: formData.purpose as Reservation['purpose'],
        etc: formData.etc,
        status: reservationStatus,
        userId: 0, // 현재 로그인한 사용자 ID로 대체
        createdAt: now,
        updatedAt: now,
      };

      let result;

      if (reservation) {
        // 예약 수정 - 타입 에러 수정
        const updateData: Partial<Reservation> = {
          startTime: data.startTime,
          endTime: data.endTime,
          purpose: data.purpose,
          etc: data.etc,
          status: data.status,
          updatedAt: now,
        };

        await updateReservation.mutateAsync({
          reservationId: reservation.id,
          data: updateData,
        });

        // 전체 객체 구성
        result = {
          ...reservation,
          ...updateData,
        };
      } else {
        // 새 예약 생성
        result = await createReservation.mutateAsync(
          data as Omit<Reservation, 'id'>,
        );
      }

      onSave(result as Reservation);
      closeModal();
    } catch (error: any) {
      console.error('Failed to save reservation:', error);
      setError('예약 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      setStoreError(error?.message || '예약 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Header>
        {reservation ? '예약 수정' : '새 예약 만들기'}
      </Modal.Header>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="date">날짜</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={format(new Date(), 'yyyy-MM-dd')}
            required
          />
        </FormGroup>

        <div style={{ display: 'flex', gap: '16px' }}>
          <FormGroup style={{ flex: 1 }}>
            <Label htmlFor="startTime">시작 시간</Label>
            <Input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup style={{ flex: 1 }}>
            <Label htmlFor="endTime">종료 시간</Label>
            <Input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label htmlFor="purpose">목적</Label>
          <Select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          >
            <option value="SEMINAR">세미나</option>
            <option value="CLASS">수업</option>
            <option value="MEETING">회의</option>
            <option value="OTHER">기타</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="etc">비고 (선택사항)</Label>
          <Input
            type="text"
            id="etc"
            name="etc"
            value={formData.etc}
            onChange={handleChange}
            placeholder="추가 정보를 입력하세요"
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <CancelButton type="button" onClick={closeModal}>
            취소
          </CancelButton>
          <SaveButton type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? '저장 중...'
              : reservation
                ? '수정하기'
                : '예약하기'}
          </SaveButton>
        </ButtonGroup>
      </FormContainer>
    </>
  );
};

export default ReservationForm;
