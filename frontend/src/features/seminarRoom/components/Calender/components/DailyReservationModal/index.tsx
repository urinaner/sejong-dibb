import React from 'react';
import { format, parse } from 'date-fns';
import { Modal, useModal } from '../../../../../../components/Modal';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import type { Reservation } from '../../../../types/reservation.types';
import {
  ModalHeader,
  ModalContent,
  ReservationList,
  ReservationItem,
  EmptyMessage,
  ButtonGroup,
  SubmitButton,
  CancelButton,
} from '../../CalendarStyle';
import { ClipboardList, Clock, Tag, Info, Plus } from 'lucide-react';
import ReservationForm from '../ReservationForm';

interface DailyReservationModalProps {
  date: string;
  roomId: number;
}

function DailyReservationModal({ date, roomId }: DailyReservationModalProps) {
  const { closeModal, openModal } = useModal();
  const { useDailyReservations } = useReservationQuery(roomId);
  const { data: reservations, isLoading } = useDailyReservations(date);

  const getColorByPurpose = (purpose: Reservation['purpose']) => {
    const colors = {
      SEMINAR: '#1a73e8', // 파란색
      CLASS: '#0b8043', // 초록색
      MEETING: '#f6bf26', // 노란색
      OTHER: '#616161', // 회색
    };
    return colors[purpose] || colors.OTHER;
  };

  const handleNewReservation = () => {
    closeModal();
    setTimeout(() => {
      openModal(
        <ReservationForm
          roomId={roomId}
          preselectedDate={parse(date, 'yyyy-MM-dd', new Date())}
        />,
      );
    }, 200);
  };

  const formatPurpose = (purpose: Reservation['purpose']) => {
    const purposes = {
      SEMINAR: '세미나',
      CLASS: '수업',
      MEETING: '회의',
      OTHER: '기타',
    };
    return purposes[purpose] || '기타';
  };

  const renderContent = () => {
    if (isLoading) {
      return <EmptyMessage>예약 정보를 불러오는 중...</EmptyMessage>;
    }

    if (!reservations || reservations.length === 0) {
      return (
        <>
          <EmptyMessage>이 날짜에 예약된 일정이 없습니다.</EmptyMessage>
          <ButtonGroup>
            <SubmitButton onClick={handleNewReservation}>
              <Plus size={16} />새 예약 만들기
            </SubmitButton>
          </ButtonGroup>
        </>
      );
    }

    return (
      <>
        <ReservationList>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              style={{
                backgroundColor: getColorByPurpose(reservation.purpose),
              }}
            >
              <div className="time">
                <Clock
                  size={16}
                  style={{ verticalAlign: 'middle', marginRight: '6px' }}
                />
                {format(new Date(reservation.startTime), 'HH:mm')} -{' '}
                {format(new Date(reservation.endTime), 'HH:mm')}
              </div>
              <div className="purpose">
                <Tag
                  size={14}
                  style={{ verticalAlign: 'middle', marginRight: '6px' }}
                />
                {formatPurpose(reservation.purpose)}
              </div>
              {reservation.etc && (
                <div className="etc">
                  <Info
                    size={12}
                    style={{ verticalAlign: 'middle', marginRight: '6px' }}
                  />
                  {reservation.etc}
                </div>
              )}
            </ReservationItem>
          ))}
        </ReservationList>

        <ButtonGroup>
          <SubmitButton onClick={handleNewReservation}>
            <Plus size={16} />새 예약 만들기
          </SubmitButton>
        </ButtonGroup>
      </>
    );
  };

  return (
    <>
      <ModalHeader>
        <ClipboardList
          size={20}
          style={{ verticalAlign: 'middle', marginRight: '8px' }}
        />
        {format(parse(date, 'yyyy-MM-dd', new Date()), 'yyyy년 M월 d일')} 예약
        현황
      </ModalHeader>
      <ModalContent>{renderContent()}</ModalContent>
    </>
  );
}

export default DailyReservationModal;
