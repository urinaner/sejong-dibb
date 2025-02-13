import React from 'react';
import { ReservationBtn } from '../../CalendarStyle';
import { useModal } from '../../../../../../components/Modal';
import ReservationForm from '../ReservationForm';

interface ReservationButtonProps {
  roomId: number;
}

function ReservationButton({ roomId }: ReservationButtonProps) {
  const { openModal } = useModal();

  const handleCreateReservation = () => {
    openModal(<ReservationForm roomId={roomId} />);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ReservationBtn onClick={handleCreateReservation}>
        예약하기
      </ReservationBtn>
    </div>
  );
}

export default ReservationButton;
