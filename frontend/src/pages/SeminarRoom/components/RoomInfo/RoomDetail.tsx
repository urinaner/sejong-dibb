import React from 'react';
import styled from 'styled-components';
import type { RoomInfo } from '../../types/reservation.types';

const RoomContainer = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const RoomImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

type RoomDetailProps = RoomInfo;

const RoomDetail: React.FC<RoomDetailProps> = ({
  name,
  capacity,
  location,
  image,
}) => {
  return (
    <RoomContainer>
      <RoomImage src={image} alt={name} />
      <InfoGrid>
        <InfoItem>
          <Label>세미나실</Label>
          <Value>{name}</Value>
        </InfoItem>
        <InfoItem>
          <Label>수용 인원</Label>
          <Value>{capacity}명</Value>
        </InfoItem>
        <InfoItem>
          <Label>위치</Label>
          <Value>{location}</Value>
        </InfoItem>
      </InfoGrid>
    </RoomContainer>
  );
};

export default RoomDetail;
