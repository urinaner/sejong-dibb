// 📁 src/pages/SeminarRoom/Reservation.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment, { MomentInput } from 'moment';
import {
  Container,
  HeaderContainer,
  Navigation,
  NavButton,
  NavButtonGroup,
  RoomContainer,
  RoomInfo,
  RoomName,
  RoomImg,
  Capacity,
  Location,
  ReservationBtn,
  StyledCalendar,
} from './ReservationStyle';
import { Modal, useModal } from '../../components/Modal';
import { ReservationModal } from './ReservationModal';
import { ReservationData } from './types/reservation.types';
import {API_URL} from '../../config/apiConfig'; // API 베이스 URI 가져오기

function Reservation() {
  const { openModal, closeModal } = useModal();
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  // 🧩 GET 요청 함수: API를 통해 해당 월의 예약 데이터 가져오기
  const fetchReservations = async (yearMonth: string) => {
    try {
      const response = await axios.get(`${API_URL}/room/1/reservation/month`, {
        params: { yearMonth },
      });
      setReservations(response.data);
    } catch (error) {
      console.error('예약 데이터를 가져오는 중 에러 발생:', error);
    }
  };

  // 📆 달력 날짜 변경 시 예약 데이터 다시 가져오기
  useEffect(() => {
    const yearMonth = moment(selectedDate).format('YYYY-MM');
    fetchReservations(yearMonth);
  }, [selectedDate]);

  const handleReservationClick = () => {
    openModal(
        <ReservationModal
            isOpen={true}
            onClose={closeModal}
            selectedDate={selectedDate}
            selectedRoom="세미나실1"
            existingReservations={reservations}
        />,
    );
  };

  const handleDateChange = (date: MomentInput) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  };

  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const reservationsForDate = reservations.filter(
        (reservation) => reservation.date === formattedDate,
    );

    if (reservationsForDate.length === 0) return null;

    return (
        <div>
          {reservationsForDate.map((reservation, index) => (
              <div key={index} style={{ backgroundColor: '#1a73e8', padding: '2px', margin: '2px', color: 'white' }}>
                {reservation.startTime}~{reservation.endTime}
              </div>
          ))}
        </div>
    );
  };

  return (
      <Container>
        <HeaderContainer>
          <Navigation>
            <NavButtonGroup>
              <NavButton isActive={true}>세미나실1</NavButton>
            </NavButtonGroup>
          </Navigation>
        </HeaderContainer>
        <RoomContainer>
          <RoomInfo>
            <RoomName>세미나실1</RoomName>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <RoomImg src="/seminarRoom1.jpg" alt="세미나실1" />
              </div>
              <div>
                <Capacity>수용인원</Capacity>
                <span>30명</span>
                <br />
                <Location>장소</Location>
                <span>충무관 501호</span>
              </div>
            </div>
          </RoomInfo>
        </RoomContainer>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ReservationBtn onClick={handleReservationClick}>예약하기</ReservationBtn>
        </div>
        <StyledCalendar
            calendarType="gregory"
            locale="ko"
            formatDay={(locale, date) => moment(date).format('D')}
            prev2Label={null}
            next2Label={null}
            minDetail="year"
            onChange={handleDateChange}
            tileContent={tileContent}
            minDate={new Date()}
        />
      </Container>
  );
}

export default Reservation;
