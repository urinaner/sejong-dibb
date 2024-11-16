import { useState } from 'react';
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
import moment, { Moment, MomentInput } from 'moment';

const seminarRooms: string[] = ['세미나실1', '세미나실2'];

// 더미 데이터 타입 정의
interface Reservation {
  id: number;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  userName: string;
  purpose: 'SEMINAR' | 'STUDY' | 'MEETING' | 'OTHER';
  contact: string;
  department?: string;
}

// 더미 데이터
const dummyReservations: Reservation[] = [
  {
    id: 1,
    roomId: '세미나실1',
    date: '2024-11-16',
    startTime: '09:00',
    endTime: '11:00',
    userName: '김철수',
    purpose: 'SEMINAR',
    contact: '010-1234-5678',
    department: '컴퓨터공학과',
  },
  {
    id: 2,
    roomId: '세미나실1',
    date: '2024-11-16',
    startTime: '13:00',
    endTime: '15:00',
    userName: '이영희',
    purpose: 'STUDY',
    contact: '010-2345-6789',
  },
];

function Reservation() {
  const [selectedRoom, setSelectedRoom] = useState('세미나실1');
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY년 MM월 DD일'),
  );

  const handleRoomChange = (room: string) => {
    setSelectedRoom(room);
  };

  const handleBtnClick = () => {
    console.log(selectedDate);
  };

  const handleDateChange = (date: MomentInput) => {
    setSelectedDate(moment(date).format('YYYY년 MM월 DD일'));
  };

  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const reservationsForDate = dummyReservations.filter(
      (reservation) =>
        reservation.date === formattedDate &&
        reservation.roomId === selectedRoom,
    );

    if (reservationsForDate.length === 0) return null;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '8px',
          marginTop: '2px',
        }}
      >
        {reservationsForDate.map((reservation, index) => (
          <div
            key={index}
            style={{
              backgroundColor: getColorByPurpose(reservation.purpose),
              padding: '1px',
              margin: '1px',
              borderRadius: '2px',
              color: 'white',
            }}
          >
            {reservation.startTime}~{reservation.endTime}
          </div>
        ))}
      </div>
    );
  };

  const getColorByPurpose = (purpose: string) => {
    const colors = {
      SEMINAR: '#1a73e8',
      STUDY: '#34d399',
      MEETING: '#f59e0b',
      OTHER: '#9ca3af',
    };
    return colors[purpose as keyof typeof colors] || colors.OTHER;
  };

  // 예약이 있는 날짜의 스타일 지정
  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const hasReservations = dummyReservations.some(
      (reservation) =>
        reservation.date === formattedDate &&
        reservation.roomId === selectedRoom,
    );
    return hasReservations ? 'has-reservation' : '';
  };

  return (
    <Container>
      <HeaderContainer>
        <Navigation>
          <NavButtonGroup>
            {seminarRooms.map((room) => (
              <NavButton
                key={room}
                isActive={selectedRoom === room}
                onClick={() => handleRoomChange(room)}
              >
                {room}
              </NavButton>
            ))}
          </NavButtonGroup>
        </Navigation>
      </HeaderContainer>
      <RoomContainer>
        <RoomInfo>
          <RoomName>{selectedRoom}</RoomName>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: '1' }}>
              <RoomImg src="/seminarRoom1.jpg" />
            </div>
            <div style={{ flexGrow: '1' }}>
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
        <ReservationBtn onClick={handleBtnClick}>예약하기</ReservationBtn>
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
        tileClassName={tileClassName}
      />
    </Container>
  );
}

export default Reservation;
