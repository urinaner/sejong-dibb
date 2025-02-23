import React from 'react';
import { ReservationBtn, ReservationBtnContainer } from '../../CalendarStyle';
import { useModal } from '../../../../../../components/Modal';
import ReservationForm from '../ReservationForm';
import { CalendarPlus } from 'lucide-react';

interface ReservationButtonProps {
  roomId: number;
}

function ReservationButton({ roomId }: ReservationButtonProps) {
  const { openModal } = useModal();

  const handleCreateReservation = () => {
    openModal(<ReservationForm roomId={roomId} />);
  };

  return (
    <ReservationBtnContainer>
      <ReservationBtn onClick={handleCreateReservation}>
        <CalendarPlus size={18} />
        예약하기
      </ReservationBtn>
    </ReservationBtnContainer>
  );
}

export default ReservationButton;
