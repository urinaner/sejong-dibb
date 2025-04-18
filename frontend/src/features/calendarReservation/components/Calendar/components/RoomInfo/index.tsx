import React from 'react';
import {
  RoomContainer,
  RoomInfo as StyledRoomInfo,
  RoomImg,
  RoomImageContainer,
  RoomDetailsContainer,
  RoomDetail,
  RoomDetailLabel,
} from '../../CalendarStyle';

interface RoomInfoProps {
  roomId: number;
}

function RoomInfo() {
  return (
    <>
      <RoomContainer>
        <StyledRoomInfo>
          <RoomImageContainer>
            <RoomImg src={'/seminarRoom.jpeg'} alt={`세미나실`} />
          </RoomImageContainer>
          <RoomDetailsContainer>
            <RoomDetail>
              <RoomDetailLabel>수용인원:</RoomDetailLabel>
              <span>15명</span>
            </RoomDetail>

            <RoomDetail>
              <RoomDetailLabel>위치:</RoomDetailLabel>
              <span>충무관 507C호</span>
            </RoomDetail>

            <RoomDetail>
              <RoomDetailLabel>이용안내:</RoomDetailLabel>
              <span>
                바이오융합공학 재학생 및 교직원만 이용 가능합니다. <br />
                예약일 기준 7일 이전에 등록 부탁드립니다.
              </span>
            </RoomDetail>
          </RoomDetailsContainer>
        </StyledRoomInfo>
      </RoomContainer>
    </>
  );
}

export default RoomInfo;
