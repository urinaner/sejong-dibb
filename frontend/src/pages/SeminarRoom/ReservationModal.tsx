import React, { useState } from 'react';
import moment from 'moment';
import { Modal, useModal } from '../../components/Modal';
import styled from 'styled-components';
import { ReservationData } from './types/reservation.types';

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ErrorMessage = styled.p`
  color: #b71c1c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedRoom: string;
  existingReservations: ReservationData[];
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedRoom,
  existingReservations,
}) => {
  const [formData, setFormData] = useState({
    userName: '',
    department: '',
    contact: '',
    purpose: '세미나',
    startTime: '09:00',
    endTime: '10:00',
  });
  const [error, setError] = useState<string>('');

  const timeSlots = [];
  for (let i = 9; i <= 17; i++) {
    timeSlots.push(`${String(i).padStart(2, '0')}:00`);
    timeSlots.push(`${String(i).padStart(2, '0')}:30`);
  }

  const validateTimeSlot = (start: string, end: string) => {
    if (start >= end) {
      return '종료 시간은 시작 시간보다 늦어야 합니다.';
    }

    const isOverlapping = existingReservations.some((reservation) => {
      if (reservation.date !== selectedDate) return false;
      return (
        (start >= reservation.startTime && start < reservation.endTime) ||
        (end > reservation.startTime && end <= reservation.endTime) ||
        (start <= reservation.startTime && end >= reservation.endTime)
      );
    });

    if (isOverlapping) {
      return '이미 예약된 시간과 겹칩니다.';
    }

    return '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const timeError = validateTimeSlot(formData.startTime, formData.endTime);
    if (timeError) {
      setError(timeError);
      return;
    }

    // TODO: API 연동 후 실제 예약 처리
    console.log('Reservation submitted:', {
      ...formData,
      date: selectedDate,
      roomId: selectedRoom,
    });

    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'startTime' || name === 'endTime') {
      const timeError = validateTimeSlot(
        name === 'startTime' ? value : formData.startTime,
        name === 'endTime' ? value : formData.endTime,
      );
      setError(timeError);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal.Header>세미나실 예약</Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit} id="reservationForm">
          <FormGroup>
            <Label>예약 날짜</Label>
            <Input
              type="text"
              value={moment(selectedDate).format('YYYY년 MM월 DD일')}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>세미나실</Label>
            <Input type="text" value={selectedRoom} disabled />
          </FormGroup>
          <FormGroup>
            <Label>예약 시간</Label>
            <TimeContainer>
              <Select
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
              <span>~</span>
              <Select
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </TimeContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>예약자명</Label>
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>학과</Label>
            <Input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              placeholder="010-0000-0000"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>사용 목적</Label>
            <Select
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
            >
              <option value="세미나">세미나</option>
              <option value="스터디">스터디</option>
              <option value="미팅">미팅</option>
              <option value="기타">기타</option>
            </Select>
          </FormGroup>
        </form>
      </Modal.Content>
      <Modal.Footer>
        <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
        <Modal.DeleteButton
          onClick={() => {
            const form = document.getElementById(
              'reservationForm',
            ) as HTMLFormElement;
            form.requestSubmit();
          }}
        >
          예약하기
        </Modal.DeleteButton>
      </Modal.Footer>
    </>
  );
};
