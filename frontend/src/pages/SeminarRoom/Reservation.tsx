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
        onChange={handleDateChange}
      />
    </Container>
  );
}

export default Reservation;
