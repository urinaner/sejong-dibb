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
import { Modal, useModal } from '../../components/Modal';
import moment, { MomentInput } from 'moment';
import styled from 'styled-components';

const seminarRooms: string[] = ['세미나실1', '세미나실2'];

// 더미 데이터 타입 정의
interface Reservation {
  id: number;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  userName: string;
  purpose: '세미나' | '스터디' | '미팅' | '기타';
  contact: string;
  department?: string;
}

// 더미 데이터
const dummyReservations: Reservation[] = [
  {
    id: 1,
    roomId: '세미나실1',
    date: '2024-12-02',
    startTime: '09:00',
    endTime: '11:00',
    userName: '김철수',
    purpose: '세미나',
    contact: '010-1234-5678',
    department: '컴퓨터공학과',
  },
  {
    id: 2,
    roomId: '세미나실1',
    date: '2024-12-02',
    startTime: '11:00',
    endTime: '12:00',
    userName: '이영희',
    purpose: '스터디',
    contact: '010-2345-6789',
  },
  {
    id: 2,
    roomId: '세미나실1',
    date: '2024-12-02',
    startTime: '13:00',
    endTime: '15:00',
    userName: '이영희',
    purpose: '미팅',
    contact: '010-2345-6789',
  },
  {
    id: 3,
    roomId: '세미나실1',
    date: '2024-12-02',
    startTime: '16:00',
    endTime: '17:30',
    userName: '이영희',
    purpose: '기타',
    contact: '010-2345-6789',
  },
];

function Reservation() {
  const { openModal, closeModal } = useModal();
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

  const CustomModalHeader = styled(Modal.Header)`
    font-size: 24px;
    font-weight: bold;
  `;

  const List = styled.p<{ className?: string }>`
    margin: 0 0 8px 0;
    padding-left: 12px;
    color: white;

    background-color: ${({ className }) =>
      className === '세미나'
        ? '#1a73e8'
        : className === '스터디'
          ? '#34d399'
          : className === '미팅'
            ? '#f59e0b'
            : '#9ca3af'};
  `;

  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const reservationsForDate = dummyReservations.filter(
      (reservation) =>
        reservation.date === formattedDate &&
        reservation.roomId === selectedRoom,
    );

    if (reservationsForDate.length === 0) return null;

    const visibleReservations = reservationsForDate.slice(0, 2); // 최대 2개 일정만 표시
    const moreCount = reservationsForDate.length - visibleReservations.length;

    const showAllReservation = (formattedDate: string) => {
      openModal(
        <>
          <CustomModalHeader>
            {moment(formattedDate).format('YYYY년 MM월 DD일')}
          </CustomModalHeader>
          <Modal.Content>
            <p>
              {reservationsForDate.map((reservation, index) => (
                <List key={index} className={reservation.purpose}>
                  {reservation.startTime}~{reservation.endTime}{' '}
                  {reservation.purpose}
                </List>
              ))}
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton onClick={() => closeModal()} />
          </Modal.Footer>
        </>,
      );
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '8px',
          marginTop: '2px',
        }}
      >
        {visibleReservations.map((reservation, index) => (
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
        {moreCount > 0 && (
          <div
            style={{
              marginTop: '2px',
              fontSize: '10px',
              color: '#555',
              textAlign: 'center',
            }}
            onClick={() => showAllReservation(formattedDate)}
          >
            {moreCount}개 더보기
          </div>
        )}
      </div>
    );
  };

  const getColorByPurpose = (purpose: string) => {
    const colors = {
      세미나: '#1a73e8',
      스터디: '#34d399',
      미팅: '#f59e0b',
      기타: '#9ca3af',
    };
    return colors[purpose as keyof typeof colors] || colors.기타;
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
