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
import EventDetailModal from './components/EventDetailModal';
import ReservationForm from './components/ReservationForm';
import { CalendarContainer } from './components/styles';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import useAuth from '../../../../hooks/useAuth';
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
  const { isAuthenticated, isAdmin } = useAuth();

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
    eventDetailOpen,
    reservationFormOpen,
    selectedStartTime,
    selectedEndTime,
    selectedReservation,
    handleSaveReservation,
    handleDeleteReservation,
    handleEditReservation,
    handleCloseEventDetail,
    handleCloseReservationForm,
  } = useCalendarEvents(ROOM_ID, refetchMonthly);

  // 윈도우 리사이즈 이벤트 핸들러
  useEffect(() => {
    window.addEventListener('resize', updateCalendarSize);
    return () => {
      window.removeEventListener('resize', updateCalendarSize);
    };
  }, [updateCalendarSize]);

  // 권한에 따른 기능 제한 함수
  const hasPermission = (
    action: 'create' | 'read' | 'update' | 'delete',
  ): boolean => {
    // 인증되지 않은 경우 모든 권한 없음
    if (!isAuthenticated) return false;

    // 모든 사용자는 조회(read) 가능
    if (action === 'read') return true;

    // 관리자는 모든 작업 가능
    if (isAdmin) return true;

    // 학생은 생성만 가능
    if (!isAdmin && action === 'create') return true;

    // 나머지 경우는 권한 없음
    return false;
  };

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
          selectable={hasPermission('create')} // 권한에 따라 선택 가능 여부 설정
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
          editable={hasPermission('update')} // 권한에 따라 편집 가능 여부 설정
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height="100%"
          stickyHeaderDates={true}
          expandRows={true}
          windowResize={updateCalendarSize}
          dayCellContent={(arg) => {
            const dayNumber = arg.dayNumberText.replace('일', '');
            return dayNumber;
          }}
          eventClassNames={getEventClassNames}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
        />
      </CalendarContainer>

      {/* MUI 모달 컴포넌트들 */}
      {/* 이벤트 상세 모달 */}
      {selectedReservation && (
        <EventDetailModal
          open={eventDetailOpen}
          onClose={handleCloseEventDetail}
          reservation={selectedReservation}
          onDelete={handleDeleteReservation}
          onEdit={handleEditReservation}
          isAdmin={isAdmin}
          hasPermission={hasPermission}
        />
      )}

      {/* 예약 폼 모달 - selectedReservation이 null인 경우 undefined로 처리 */}
      {reservationFormOpen && (
        <ReservationForm
          roomId={ROOM_ID}
          startTime={selectedStartTime}
          endTime={selectedEndTime}
          reservation={selectedReservation || undefined} // null 대신 undefined 사용
          onSave={handleSaveReservation}
          onClose={handleCloseReservationForm}
        />
      )}
    </Container>
  );
}

export default Calendar;
