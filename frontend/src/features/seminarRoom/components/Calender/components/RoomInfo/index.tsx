import React from 'react';
import {
  HeaderContainer,
  RoomContainer,
  RoomInfo as StyledRoomInfo,
  RoomName,
  RoomImg,
  CalendarTitle,
  RoomImageContainer,
  RoomDetailsContainer,
  RoomDetail,
  RoomDetailLabel,
} from '../../CalendarStyle';
import seminarRoomImg from '../../../../assets/images/seminarRoom1.jpeg';

interface RoomInfoProps {
  roomId: number;
}

function RoomInfo({ roomId }: RoomInfoProps) {
  return (
    <>
      <HeaderContainer>
        <CalendarTitle>세미나실 예약</CalendarTitle>
      </HeaderContainer>
      <RoomContainer>
        <RoomName>세미나실 {roomId}</RoomName>
        <StyledRoomInfo>
          <RoomImageContainer>
            <RoomImg src={seminarRoomImg} alt={`세미나실 ${roomId}`} />
          </RoomImageContainer>
          <RoomDetailsContainer>
            <RoomDetail>
              <RoomDetailLabel>수용인원:</RoomDetailLabel>
              <span>30명</span>
            </RoomDetail>

            <RoomDetail>
              <RoomDetailLabel>위치:</RoomDetailLabel>
              <span>충무관 501호</span>
            </RoomDetail>

            <RoomDetail>
              <RoomDetailLabel>이용안내:</RoomDetailLabel>
              <span>
                교내 구성원만 이용 가능합니다. 예약은 최소 1일 전에 해주세요.
              </span>
            </RoomDetail>
          </RoomDetailsContainer>
        </StyledRoomInfo>
      </RoomContainer>
    </>
  );
}

export default RoomInfo;
