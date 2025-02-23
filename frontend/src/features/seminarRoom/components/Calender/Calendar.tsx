import React from 'react';
import { Container } from './CalendarStyle';
import CalendarView from './components/CalendarView';
import RoomInfo from './components/RoomInfo';
import ReservationButton from './components/ReservationButton';

const ROOM_ID = 1; // 1번 세미나실 고정

function Calendar() {
  return (
    <Container>
      <RoomInfo roomId={ROOM_ID} />
      <ReservationButton roomId={ROOM_ID} />
      <CalendarView roomId={ROOM_ID} />
    </Container>
  );
}

export default Calendar;
