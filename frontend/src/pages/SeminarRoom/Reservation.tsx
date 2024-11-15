import { useState } from 'react';
import {
  Container,
  HeaderContainer,
  Navigation,
  NavButton,
  NavButtonGroup,
} from './ReservationStyle';

const seminarRooms: string[] = ['세미나실1', '세미나실2'];

function Reservation() {
  const [selectedRoom, setSelectedRoom] = useState('세미나실1');

  const handleRoomChange = (room: string) => {
    setSelectedRoom(room);
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
    </Container>
  );
}

export default Reservation;
