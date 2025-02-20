import React, { useRef, useEffect } from 'react';
import { Container } from './CalendarStyle';
import RoomInfo from './components/RoomInfo';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { useReservationQuery } from '../../hooks/useReservationQuery';
import { format } from 'date-fns';
import { useModal } from '../../../../components/Modal';
import EventDetailModal from './components/EventDetailModal';
import ReservationForm from './components/ReservationForm';
import { Reservation } from '../../types/reservation.types';
import useReservationStore from '../../store/reservationStore';
import './GoogleCalendarStyles.css';

const ROOM_ID = 1; // 1번 세미나실 고정

function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const { openModal } = useModal();

  // Zustand store 사용
  const {
    selectedDate,
    setSelectedDate,
    reservations,
    setReservations,
    setViewMode,
    setSelectedReservation,
    addReservation,
    updateReservation,
    deleteReservation,
    setLoading,
    setError,
  } = useReservationStore();

  const {
    useMonthlyReservations,
    useDailyReservations,
    useCreateReservation,
    useUpdateReservation,
    useDeleteReservation,
  } = useReservationQuery(ROOM_ID);

  // 월별 데이터 로드
  const loadMonthData = async (startDate: Date) => {
    const yearMonth = format(startDate, 'yyyy-MM');
    setLoading(true);

    try {
      const { data } = await useMonthlyReservations(yearMonth);
      if (data) {
        setReservations(data);
      }
    } catch (error) {
      console.error('Failed to load monthly reservations:', error);
      setError('예약 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 이벤트 형식으로 데이터 변환
  const eventsFromReservations = (): EventInput[] => {
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

  // 목적별 색상 및 제목 설정
  const getPurposeColor = (purpose: Reservation['purpose']) => {
    const colors = {
      SEMINAR: '#1a73e8', // 세미나: 파란색
      CLASS: '#0b8043', // 수업: 초록색
      MEETING: '#f6bf26', // 회의: 노란색
      OTHER: '#616161', // 기타: 회색
    };
    return colors[purpose] || colors.OTHER;
  };

  const getPurposeTitle = (purpose: Reservation['purpose']) => {
    const titles = {
      SEMINAR: '세미나',
      CLASS: '수업',
      MEETING: '회의',
      OTHER: '기타',
    };
    return titles[purpose] || '기타';
  };

  // 날짜 선택 핸들러 (새 예약 생성)
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    openModal(
      <ReservationForm
        roomId={ROOM_ID}
        startTime={selectInfo.startStr}
        endTime={selectInfo.endStr}
        onSave={(newReservation) => {
          addReservation(newReservation);
        }}
      />,
    );
  };

  // 이벤트 클릭 핸들러 (예약 상세 보기)
  const handleEventClick = (clickInfo: EventClickArg) => {
    const reservation = clickInfo.event.extendedProps as Reservation;
    setSelectedReservation(reservation);

    openModal(
      <EventDetailModal
        reservation={reservation}
        onDelete={(id: number) => {
          deleteReservation(id);
        }}
        onEdit={() => {
          openModal(
            <ReservationForm
              roomId={ROOM_ID}
              reservation={reservation}
              onSave={(updatedReservation) => {
                updateReservation(updatedReservation.id, updatedReservation);
              }}
            />,
          );
        }}
      />,
    );
  };

  // 뷰 변경 시 핸들러
  const handleViewChange = (info: any) => {
    setViewMode(
      info.view.type === 'dayGridMonth'
        ? 'month'
        : info.view.type === 'timeGridWeek'
          ? 'week'
          : 'day',
    );
    loadMonthData(info.view.currentStart);
  };

  // 이벤트 드래그 핸들러
  const handleEventDrop = async (info: any) => {
    if (!window.confirm('일정을 변경하시겠습니까?')) {
      info.revert();
      return;
    }

    const { event } = info;
    const reservation = event.extendedProps as Reservation;

    try {
      // 시간 차이 계산
      const startDelta =
        event.start.getTime() - new Date(reservation.startTime).getTime();

      const updatedData = {
        ...reservation,
        startTime: event.start.toISOString(),
        endTime: new Date(
          new Date(reservation.endTime).getTime() + startDelta,
        ).toISOString(),
      };

      await useUpdateReservation().mutateAsync({
        reservationId: reservation.id,
        data: updatedData,
      });

      // Zustand 스토어 업데이트
      updateReservation(reservation.id, updatedData);

      // 성공 알림
      alert('예약이 변경되었습니다');
    } catch (error) {
      info.revert();
      console.error('Failed to update reservation:', error);
      alert('예약 변경에 실패했습니다');
    }
  };

  // 이벤트 크기 조정 핸들러
  const handleEventResize = async (info: any) => {
    if (!window.confirm('예약 시간을 변경하시겠습니까?')) {
      info.revert();
      return;
    }

    const { event } = info;
    const reservation = event.extendedProps as Reservation;

    try {
      const updatedData = {
        ...reservation,
        endTime: event.end.toISOString(),
      };

      await useUpdateReservation().mutateAsync({
        reservationId: reservation.id,
        data: updatedData,
      });

      // Zustand 스토어 업데이트
      updateReservation(reservation.id, updatedData);

      alert('예약 시간이 변경되었습니다');
    } catch (error) {
      info.revert();
      console.error('Failed to update reservation time:', error);
      alert('예약 시간 변경에 실패했습니다');
    }
  };

  // 캘린더 크기 조정
  const updateCalendarSize = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  };

  // 초기 로딩 및 화면 크기 변경 시 캘린더 크기 업데이트
  useEffect(() => {
    loadMonthData(selectedDate);

    window.addEventListener('resize', updateCalendarSize);
    return () => {
      window.removeEventListener('resize', updateCalendarSize);
    };
  }, []);

  return (
    <Container>
      {/* 원래 레이아웃처럼 상단에 RoomInfo와 ReservationButton 배치 */}
      <RoomInfo roomId={ROOM_ID} />
      {/* 캘린더 */}
      <div className="fc-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            bootstrap5Plugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          initialView="dayGridMonth"
          initialDate={selectedDate}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={eventsFromReservations()}
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
          slotMaxTime="22:00:00"
          allDaySlot={false}
          firstDay={1}
          locale="ko"
          buttonText={{
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
            list: '목록',
          }}
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
        />
      </div>
    </Container>
  );
}

export default Calendar;
