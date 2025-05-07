// src/features/seminarRoom/components/Calender/components/ReservationButton/index.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useModal } from '../../../../../../components/Modal';
import ReservationForm from '../../../../../calendarReservation/components/Calendar/components/ReservationForm';
import { format } from 'date-fns';

interface ReservationButtonProps {
  roomId: number;
}

const ReservationButton: React.FC<ReservationButtonProps> = ({ roomId }) => {
  const { openModal, closeModal } = useModal();

  const handleCreateReservation = () => {
    // 현재 날짜와 시간 설정
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');

    // 시작 시간과 종료 시간 설정 (기본값: 오전 9시부터 1시간)
    const startTime = `${formattedDate}T09:00:00`;
    const endTime = `${formattedDate}T10:00:00`;

    openModal(
      <ReservationForm
        roomId={roomId}
        startTime={startTime}
        endTime={endTime}
        onSave={() => {
          // 저장 성공 시 처리 (필요하면 추가)
          closeModal();
        }}
        onClose={closeModal}
      />,
    );
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateReservation}
      sx={{ mb: 2 }}
    >
      예약하기
    </Button>
  );
};

export default ReservationButton;
