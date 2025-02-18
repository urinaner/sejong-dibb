import React from 'react';
import { format, parse } from 'date-fns';
import { Modal } from '../../../../../../components/Modal';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import { ReservationList, ReservationItem } from './DailyReservationModalStyle';
import type { Reservation } from '../../../../types/reservation.types';

interface DailyReservationModalProps {
  date: string;
  roomId: number;
}

function DailyReservationModal({ date, roomId }: DailyReservationModalProps) {
  const { useDailyReservations } = useReservationQuery(roomId);
  const { data: reservations, isLoading } = useDailyReservations(date);

  const getColorByPurpose = (purpose: Reservation['purpose']) => {
    const colors = {
      SEMINAR: '#1a73e8',
      CLASS: '#34d399',
      MEETING: '#f59e0b',
      OTHER: '#9ca3af',
    };
    return colors[purpose] || colors.OTHER;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal.Header>
        {format(parse(date, 'yyyy-MM-dd', new Date()), 'yyyy년 MM월 dd일')}
      </Modal.Header>
      <Modal.Content>
        <ReservationList>
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <ReservationItem
                key={index}
                style={{
                  backgroundColor: getColorByPurpose(reservation.purpose),
                }}
              >
                <div className="time">
                  {format(new Date(reservation.startTime), 'HH:mm')}~
                  {format(new Date(reservation.endTime), 'HH:mm')}
                </div>
                <div className="purpose">{reservation.purpose}</div>
                {reservation.etc && (
                  <div className="etc">{reservation.etc}</div>
                )}
              </ReservationItem>
            ))
          ) : (
            <p>예약된 일정이 없습니다.</p>
          )}
        </ReservationList>
      </Modal.Content>
      <Modal.Footer>
        <Modal.CloseButton />
      </Modal.Footer>
    </>
  );
}

export default DailyReservationModal;
