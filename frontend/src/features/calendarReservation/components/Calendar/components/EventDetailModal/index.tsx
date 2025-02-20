import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Modal } from '../../../../../../components/Modal';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import { Reservation } from '../../../../types/reservation.types';

const EventContent = styled.div`
  padding: 0 24px 24px;
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ColorIndicator = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${(props) => props.color};
  margin-right: 12px;
`;

const EventTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0;
`;

const EventDetail = styled.div`
  margin-bottom: 16px;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 4px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: #202124;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const DeleteButton = styled(Button)`
  background-color: white;
  color: #ea4335;
  border: 1px solid #dadce0;

  &:hover {
    background-color: #fef7f7;
    border-color: #ea4335;
  }
`;

const EditButton = styled(Button)`
  background-color: #1a73e8;
  color: white;
  border: none;

  &:hover {
    background-color: #1766ca;
    box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3);
  }
`;

interface EventDetailModalProps {
  reservation: Reservation;
  onDelete: (id: number) => void;
  onEdit?: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  reservation,
  onDelete,
  onEdit,
}) => {
  const { useDeleteReservation } = useReservationQuery(reservation.roomId || 1);
  const deleteReservation = useDeleteReservation();

  const getPurposeTitle = (purpose: Reservation['purpose']) => {
    const titles = {
      SEMINAR: '세미나',
      CLASS: '수업',
      MEETING: '회의',
      OTHER: '기타',
    };
    return titles[purpose] || '기타';
  };

  const getPurposeColor = (purpose: Reservation['purpose']) => {
    const colors = {
      SEMINAR: '#1a73e8',
      CLASS: '#0b8043',
      MEETING: '#f6bf26',
      OTHER: '#616161',
    };
    return colors[purpose] || colors.OTHER;
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 예약을 삭제하시겠습니까?')) {
      try {
        await deleteReservation.mutateAsync(reservation.id);
        onDelete(reservation.id);
      } catch (error) {
        console.error('Failed to delete reservation:', error);
        alert('예약 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <Modal.Header>예약 상세 정보</Modal.Header>
      <EventContent>
        <EventHeader>
          <ColorIndicator color={getPurposeColor(reservation.purpose)} />
          <EventTitle>{getPurposeTitle(reservation.purpose)}</EventTitle>
        </EventHeader>

        <EventDetail>
          <DetailLabel>일시</DetailLabel>
          <DetailValue>
            {format(
              new Date(reservation.startTime),
              'yyyy년 M월 d일 (EEE) HH:mm',
            )}{' '}
            -{format(new Date(reservation.endTime), 'HH:mm')}
          </DetailValue>
        </EventDetail>

        <EventDetail>
          <DetailLabel>장소</DetailLabel>
          <DetailValue>세미나실 {reservation.roomId || 1}</DetailValue>
        </EventDetail>

        {reservation.etc && (
          <EventDetail>
            <DetailLabel>비고</DetailLabel>
            <DetailValue>{reservation.etc}</DetailValue>
          </EventDetail>
        )}

        <ButtonGroup>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          {onEdit && <EditButton onClick={onEdit}>수정</EditButton>}
        </ButtonGroup>
      </EventContent>
    </>
  );
};

export default EventDetailModal;
