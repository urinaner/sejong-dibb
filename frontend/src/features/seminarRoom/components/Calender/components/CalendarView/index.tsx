import React, { useCallback } from 'react';
import { format } from 'date-fns';
import {
  StyledCalendar,
  TileContainer,
  ReservationTile,
  MoreCount,
  LegendContainer,
  LegendItem,
  LegendColor,
  calendarColors,
} from '../../CalendarStyle';
import useReservationStore from '../../../../store/reservationStore';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import type { Reservation } from '../../../../types/reservation.types';
import DailyReservationModal from '../DailyReservationModal';
import { useModal } from '../../../../../../components/Modal';
import moment from 'moment';

interface CalendarViewProps {
  roomId: number;
}

function CalendarView({ roomId }: CalendarViewProps) {
  const { openModal } = useModal();
  const { selectedDate, setSelectedDate } = useReservationStore();
  const { useMonthlyReservations } = useReservationQuery(roomId);

  const yearMonth = format(selectedDate, 'yyyy-MM');
  const { data: monthlyReservations, refetch: refetchMonthly } =
    useMonthlyReservations(yearMonth);

  const handleDateChange = (date: moment.MomentInput) => {
    const newDate = new Date(moment(date).format('YYYY-MM-DD'));
    setSelectedDate(newDate);
  };

  const handleMonthChange = useCallback(
    (viewArgs: { activeStartDate: Date | null }) => {
      if (viewArgs.activeStartDate) {
        const newYearMonth = format(viewArgs.activeStartDate, 'yyyy-MM');
        refetchMonthly();
      }
    },
    [refetchMonthly],
  );

  const handleDayClick = (date: Date) => {
    const clickedDate = format(date, 'yyyy-MM-dd');
    openModal(<DailyReservationModal date={clickedDate} roomId={roomId} />);
  };

  const getColorByPurpose = (purpose: Reservation['purpose']) => {
    const colors = {
      SEMINAR: calendarColors.seminar,
      CLASS: calendarColors.class,
      MEETING: calendarColors.meeting,
      OTHER: calendarColors.other,
    };
    return colors[purpose] || colors.OTHER;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const reservationsForDate =
      monthlyReservations?.filter(
        (reservation) =>
          format(new Date(reservation.startTime), 'yyyy-MM-dd') ===
          formattedDate,
      ) || [];

    if (reservationsForDate.length === 0) return null;

    const visibleReservations = reservationsForDate.slice(0, 3);
    const moreCount = reservationsForDate.length - visibleReservations.length;

    return (
      <TileContainer className="reservation-container">
        {visibleReservations.map((reservation, index) => (
          <ReservationTile
            key={index}
            style={{ backgroundColor: getColorByPurpose(reservation.purpose) }}
          >
            {format(new Date(reservation.startTime), 'HH:mm')} -{' '}
            {format(new Date(reservation.endTime), 'HH:mm')}
          </ReservationTile>
        ))}
        {moreCount > 0 && (
          <MoreCount
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleDayClick(date);
            }}
          >
            +{moreCount}개 더보기
          </MoreCount>
        )}
      </TileContainer>
    );
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const hasReservations = monthlyReservations?.some(
      (reservation) =>
        format(new Date(reservation.startTime), 'yyyy-MM-dd') === formattedDate,
    );
    return hasReservations ? 'has-reservation' : '';
  };

  return (
    <>
      <LegendContainer>
        <LegendItem>
          <LegendColor color={calendarColors.seminar} />
          <span>세미나</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color={calendarColors.class} />
          <span>수업</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color={calendarColors.meeting} />
          <span>회의</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color={calendarColors.other} />
          <span>기타</span>
        </LegendItem>
      </LegendContainer>

      <StyledCalendar
        calendarType="gregory"
        locale="ko"
        formatDay={(locale, date) => ''} // 날짜 숫자는 ::before로 표시
        prev2Label={null}
        next2Label={null}
        minDetail="year"
        onChange={handleDateChange}
        onClickDay={handleDayClick}
        onActiveStartDateChange={handleMonthChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
        value={selectedDate}
      />
    </>
  );
}

export default CalendarView;
