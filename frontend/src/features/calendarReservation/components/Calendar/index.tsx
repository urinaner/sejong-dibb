// src/features/calendarReservation/components/Calendar/index.tsx
import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Container } from './CalendarStyle';
import RoomInfo from './components/RoomInfo';
import CalendarToolbar from './components/CalendarToolbar';
import LoadingIndicator from './components/LoadingIndicator';
import { CalendarContainer } from './components/styles';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import {
  convertReservationsToEvents,
  getEventClassNames,
} from '../../utils/utils';
import './GoogleCalendarStyles.css';
import './WeeklyCalendarView.css';

// 상수 정의
const ROOM_ID = 1; // 1번 세미나실 고정

function Calendar() {
  // FullCalendar 레퍼런스
  const calendarRef = useRef<FullCalendar>(null);

  // 캘린더 데이터 및 상태 관리 훅
  const {
    selectedDate,
    viewMode,
    reservations,
    isLoading,
    refetchMonthly,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleViewModeChange,
    handleViewChange,
    updateCalendarSize,
  } = useCalendarData(ROOM_ID, calendarRef);

  // 캘린더 이벤트 핸들러 훅
  const {
    handleDateSelect,
    handleEventClick,
    handleEventDrop,
    handleEventResize,
  } = useCalendarEvents(ROOM_ID, refetchMonthly);

  // 윈도우 리사이즈 이벤트 핸들러
  useEffect(() => {
    window.addEventListener('resize', updateCalendarSize);
    return () => {
      window.removeEventListener('resize', updateCalendarSize);
    };
  }, [updateCalendarSize]);

  return (
    <Container>
      {/* 세미나실 정보 */}
      <RoomInfo />
      {/* 커스텀 캘린더 툴바 */}
      <CalendarToolbar
        selectedDate={selectedDate}
        viewMode={viewMode}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onViewModeChange={handleViewModeChange}
      />

      {/* 캘린더 */}
      <CalendarContainer>
        <LoadingIndicator isLoading={isLoading} />

        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            bootstrap5Plugin,
          ]}
          headerToolbar={false} // 커스텀 툴바 사용을 위해 기본 툴바 비활성화
          initialView="dayGridMonth"
          initialDate={selectedDate}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={convertReservationsToEvents(reservations)}
          select={handleDateSelect}
          eventClick={handleEventClick}
          datesSet={handleViewChange}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false,
          }}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          firstDay={0}
          locale="ko"
          themeSystem="bootstrap5"
          nowIndicator={true}
          eventDisplay="block"
          eventOverlap={false}
          longPressDelay={0}
          editable={true}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height="auto"
          stickyHeaderDates={true}
          expandRows={true}
          windowResize={updateCalendarSize}
          dayCellContent={(arg) => {
            const dayNumber = arg.dayNumberText.replace('일', '');
            return dayNumber;
          }}
          eventClassNames={getEventClassNames}
        />
      </CalendarContainer>
    </Container>
  );
}

export default Calendar;
