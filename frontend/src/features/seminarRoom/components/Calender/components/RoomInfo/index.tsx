import React from 'react';
import {
  HeaderContainer,
  RoomContainer,
  RoomInfo as StyledRoomInfo,
  RoomName,
  RoomImg,
  Capacity,
  Location,
} from '../../CalendarStyle';

interface RoomInfoProps {
  roomId: number;
}

function RoomInfo({ roomId }: RoomInfoProps) {
  return (
    <>
      <HeaderContainer> </HeaderContainer>
      <RoomContainer>
        <StyledRoomInfo>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: '1' }}>
              {/* public 폴더의 이미지는 루트 경로(/)부터 시작 */}
              <RoomImg src="/seminarRoom.jpeg" />
            </div>
            <div style={{ flexGrow: '1' }}>
              <Capacity>수용인원</Capacity>
              <span>15명</span>
              <br />
              <Location>장소</Location>
              <span>충무관 507C호</span>
            </div>
          </div>
        </StyledRoomInfo>
      </RoomContainer>
    </>
  );
}

export default RoomInfo;
