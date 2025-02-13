import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { StyledCalendar } from '../../CalendarStyle';
import useReservationStore from '../../../../store/reservationStore';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import type { Reservation } from '../../../../types/reservation.types';
import DailyReservationModal from '../DailyReservationModal';
import { useModal } from '../../../../../../components/Modal';
import moment from 'moment';
import { ReservationTile, TileContainer } from './CalendarViewStyle';

interface CalendarViewProps {
  roomId: number;
}

function CalendarView({ roomId }: CalendarViewProps) {
  const { openModal } = useModal();
  const { selectedDate, setSelectedDate } = useReservationStore();
  const { useMonthlyReservations } = useReservationQuery(roomId);

  const [currentYearMonth, setCurrentYearMonth] = React.useState(
    format(selectedDate, 'yyyy-MM'),
  );

  const { data: monthlyReservations, refetch: refetchMonthly } =
    useMonthlyReservations(currentYearMonth);

  const handleDateChange = (date: moment.MomentInput) => {
    const newDate = new Date(moment(date).format('YYYY-MM-DD'));
    setSelectedDate(newDate);
  };

  const handleMonthChange = useCallback(
    ({ activeStartDate }: { activeStartDate: Date | null }) => {
      if (activeStartDate) {
        const newYearMonth = format(activeStartDate, 'yyyy-MM');
        setCurrentYearMonth(newYearMonth);
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
      SEMINAR: '#1a73e8',
      CLASS: '#34d399',
      MEETING: '#f59e0b',
      OTHER: '#9ca3af',
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

    const visibleReservations = reservationsForDate.slice(0, 2);
    const moreCount = reservationsForDate.length - visibleReservations.length;

    return (
      <TileContainer>
        {visibleReservations.map((reservation, index) => (
          <ReservationTile
            key={index}
            style={{ backgroundColor: getColorByPurpose(reservation.purpose) }}
          >
            {format(new Date(reservation.startTime), 'HH:mm')}~
            {format(new Date(reservation.endTime), 'HH:mm')}
          </ReservationTile>
        ))}
        {moreCount > 0 && (
          <div className="more-count">{moreCount}개 더보기</div>
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
    <StyledCalendar
      calendarType="gregory"
      locale="ko"
      formatDay={(locale, date) => format(date, 'd')}
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
  );
}

export default CalendarView;
