import React, { useState } from 'react';
import styled from 'styled-components';
import { format, addHours, parse, setHours, setMinutes } from 'date-fns';
import { Modal, useModal } from '../../../../../../components/Modal';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import {
  Reservation,
  ReservationStatus,
} from '../../../../types/reservation.types';
import useReservationStore from '../../../../store/reservationStore';

const FormContainer = styled.form`
  padding: 0 32px 32px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    background-color: white;
  }

  &:hover:not(:focus) {
    border-color: #aecbfa;
    background-color: #f8f9fa;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f8f9fa;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    background-color: white;
  }

  &:hover:not(:focus) {
    border-color: #aecbfa;
    background-color: #f8f9fa;
  }
`;

const TimeInputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const InfoMessage = styled.p`
  margin-top: 4px;
  font-size: 12px;
  color: #5f6368;
  font-style: italic;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 16px;
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
    border-color: #c0c4c9;
  }

  &:active {
    background-color: #e8eaed;
  }
`;

const SaveButton = styled(Button)`
  background-color: #1a73e8;
  color: white;
  border: none;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);

  &:hover {
    background-color: #1766ca;
    box-shadow: 0 2px 6px rgba(60, 64, 67, 0.3);
  }

  &:active {
    background-color: #1a66ca;
    box-shadow: 0 1px 3px rgba(60, 64, 67, 0.4);
  }

  &:disabled {
    background-color: #a8c7fa;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  color: #d93025;
  font-size: 14px;
  margin-top: 12px;
  padding: 12px 16px;
  background-color: #fce8e6;
  border-radius: 8px;
  border-left: 4px solid #d93025;
`;

const SectionDivider = styled.div`
  height: 1px;
  background-color: #e8eaed;
  margin: 32px 0;
`;

const ModalTitle = styled.h2`
  font-size: 30px;
  color: #202124;
  font-weight: 800;
  padding: 20px 32px;
  border-bottom: 1px solid #e8eaed;
  margin: 0;
`;

// Generate time options in 30-minute intervals from 9:00 to 18:00
const generateTimeOptions = () => {
  const options = [];
  const startHour = 9;
  const endHour = 18;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of [0, 30]) {
      // Skip 18:30 as it's after end time
      if (hour === endHour && minute === 30) continue;

      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const timeString = `${formattedHour}:${formattedMinute}`;

      options.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>,
      );
    }
  }

  return options;
};

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

  // Set default times within allowed range (9:00-18:00)
  const getDefaultStartTime = () => {
    if (startTime) {
      const date = new Date(startTime);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // If time is within range, use it
      if (hours >= 9 && hours < 18) {
        // Round to nearest 30 minutes
        const roundedMinutes = Math.round(minutes / 30) * 30;
        return `${hours.toString().padStart(2, '0')}:${roundedMinutes === 0 ? '00' : '30'}`;
      }
    }

    // Default to 9:00 if out of range or not provided
    return '09:00';
  };

  const getDefaultEndTime = () => {
    if (endTime) {
      const date = new Date(endTime);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // If time is within range and after start time, use it
      if (hours >= 9 && hours <= 18) {
        // Round to nearest 30 minutes
        const roundedMinutes = Math.round(minutes / 30) * 30;
        return `${hours.toString().padStart(2, '0')}:${roundedMinutes === 0 ? '00' : '30'}`;
      }
    }

    // Default: start time + 1 hour (or 18:00 if that would exceed)
    const startTimeValue = getDefaultStartTime();
    const [startHour, startMinute] = startTimeValue.split(':').map(Number);
    let endHour = startHour + 1;
    let endMinute = startMinute;

    if (endHour > 18) {
      endHour = 18;
      endMinute = 0;
    }

    return `${endHour.toString().padStart(2, '0')}:${endMinute === 0 ? '00' : '30'}`;
  };

  // 기본값 설정
  const initialDate = startTime
    ? format(new Date(startTime), 'yyyy-MM-dd')
    : format(selectedDate, 'yyyy-MM-dd');

  const initialStartTime = getDefaultStartTime();
  const initialEndTime = getDefaultEndTime();

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

    // If start time changed, adjust end time if needed
    if (name === 'startTime') {
      const [startHour, startMinute] = value.split(':').map(Number);
      const [currentEndHour, currentEndMinute] = formData.endTime
        .split(':')
        .map(Number);

      // Check if end time is now before or equal to start time
      const startTimeTotal = startHour * 60 + startMinute;
      const endTimeTotal = currentEndHour * 60 + currentEndMinute;

      if (endTimeTotal <= startTimeTotal) {
        // Set end time to start time + 30 mins, capped at 18:00
        let newEndHour = startHour;
        let newEndMinute = startMinute + 30;

        if (newEndMinute >= 60) {
          newEndHour += 1;
          newEndMinute = 0;
        }

        if (newEndHour > 18 || (newEndHour === 18 && newEndMinute > 0)) {
          newEndHour = 18;
          newEndMinute = 0;
        }

        setFormData((prev) => ({
          ...prev,
          endTime: `${newEndHour.toString().padStart(2, '0')}:${newEndMinute === 0 ? '00' : '30'}`,
        }));
      }
    }
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

    // Validate time is within allowed range (9:00-18:00)
    const startHour = start.getHours();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();

    if (startHour < 9) {
      return '예약은 오전 9시부터 가능합니다.';
    }

    if (endHour > 18 || (endHour === 18 && endMinutes > 0)) {
      return '예약은 오후 6시까지만 가능합니다.';
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
        <ModalTitle>{reservation ? '예약 수정' : '세미나실 예약 '}</ModalTitle>
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

        <TimeInputsContainer>
          <FormGroup>
            <Label htmlFor="startTime">시작 시간</Label>
            <Select
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            >
              {generateTimeOptions()}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endTime">종료 시간</Label>
            <Select
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            >
              {generateTimeOptions()}
            </Select>
          </FormGroup>
        </TimeInputsContainer>

        <InfoMessage>예약 가능 시간: 09:00 - 18:00 (30분 단위)</InfoMessage>

        <SectionDivider />

        <FormGroup>
          <Label htmlFor="purpose">예약 목적</Label>
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
            placeholder="추가 설명이나 참석자 정보 등을 입력하세요"
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
