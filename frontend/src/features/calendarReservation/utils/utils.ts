// src/features/calendarReservation/components/Calendar/utils.ts
import { Reservation } from '../types/reservation.types';
import { EventInput } from '@fullcalendar/core';

/**
 * 예약 목적에 따른 색상을 반환합니다
 */
export const getPurposeColor = (purpose: Reservation['purpose']): string => {
  const colors = {
    SEMINAR: '#1a73e8', // 세미나: 파란색
    CLASS: '#0b8043', // 수업: 초록색
    MEETING: '#f6bf26', // 회의: 노란색
    OTHER: '#616161', // 기타: 회색
  };
  return colors[purpose] || colors.OTHER;
};

/**
 * 예약 목적에 따른 제목을 반환합니다
 */
export const getPurposeTitle = (purpose: Reservation['purpose']): string => {
  const titles = {
    SEMINAR: '세미나',
    CLASS: '수업',
    MEETING: '회의',
    OTHER: '기타',
  };
  return titles[purpose] || '기타';
};

/**
 * 예약 데이터를 FullCalendar 이벤트 형식으로 변환합니다
 */
export const convertReservationsToEvents = (
  reservations: Reservation[],
): EventInput[] => {
  return reservations.map((reservation) => ({
    id: String(reservation.id),
    title:
      getPurposeTitle(reservation.purpose) +
      (reservation.etc ? ` - ${reservation.etc}` : ''),
    start: reservation.startTime,
    end: reservation.endTime,
    backgroundColor: getPurposeColor(reservation.purpose),
    borderColor: getPurposeColor(reservation.purpose),
    textColor: '#ffffff',
    extendedProps: {
      ...reservation,
    },
  }));
};

/**
 * 이벤트의 class를 목적에 따라 지정합니다
 */
export const getEventClassNames = (eventInfo: any): string => {
  const purpose = eventInfo.event.extendedProps?.purpose;
  switch (purpose) {
    case 'SEMINAR':
      return 'seminar-event';
    case 'CLASS':
      return 'class-event';
    case 'MEETING':
      return 'meeting-event';
    default:
      return 'other-event';
  }
};
