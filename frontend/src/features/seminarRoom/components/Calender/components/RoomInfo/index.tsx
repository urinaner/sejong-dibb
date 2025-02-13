// src/features/seminarRoom/components/Calender/components/RoomInfo/index.tsx

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
      <HeaderContainer>
        <RoomName>세미나실 {roomId}</RoomName>
      </HeaderContainer>
      <RoomContainer>
        <StyledRoomInfo>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: '1' }}>
              {/* public 폴더의 이미지는 루트 경로(/)부터 시작 */}
              <RoomImg src="/seminarRoom1.jpeg" alt={`세미나실 ${roomId}`} />
            </div>
            <div style={{ flexGrow: '1' }}>
              <Capacity>수용인원</Capacity>
              <span>30명</span>
              <br />
              <Location>장소</Location>
              <span>충무관 501호</span>
            </div>
          </div>
        </StyledRoomInfo>
      </RoomContainer>
    </>
  );
}

export default RoomInfo;
