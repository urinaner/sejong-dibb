// src/features/calendarReservation/components/Calendar/hooks/useCalendarData.ts
import { useState, useEffect, RefObject } from 'react';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import useReservationStore from '../store/reservationStore';
import { useReservationQuery } from './useReservationQuery';

/**
 * 캘린더 데이터와 상태 관리를 위한 커스텀 훅
 */
export const useCalendarData = (
  roomId: number,
  calendarRef: RefObject<FullCalendar>,
) => {
  const [currentYearMonth, setCurrentYearMonth] = useState(
    format(new Date(), 'yyyy-MM'),
  );

  // Zustand store 사용
  const {
    selectedDate,
    setSelectedDate,
    reservations,
    setReservations,
    viewMode,
    setViewMode,
    setLoading,
    isLoading,
    setError,
  } = useReservationStore();

  // 리액트 쿼리 훅
  const { useMonthlyReservations } = useReservationQuery(roomId);

  // 월별 예약 데이터 쿼리
  const {
    data: monthlyData,
    isFetching: isMonthlyLoading,
    refetch: refetchMonthly,
  } = useMonthlyReservations(currentYearMonth);

  // 데이터가 로드되면 store에 저장
  useEffect(() => {
    if (monthlyData) {
      setReservations(monthlyData);
    }
  }, [monthlyData, setReservations]);

  // 로딩 상태 동기화
  useEffect(() => {
    setLoading(isMonthlyLoading);
  }, [isMonthlyLoading, setLoading]);

  // 커스텀 툴바 핸들러
  const handlePrevMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();

      // 이전 달로 이동 후 현재 표시중인 날짜 가져오기
      const newDate = calendarApi.getDate();
      setSelectedDate(newDate);
      setCurrentYearMonth(format(newDate, 'yyyy-MM'));
    }
  };

  const handleNextMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();

      // 다음 달로 이동 후 현재 표시중인 날짜 가져오기
      const newDate = calendarApi.getDate();
      setSelectedDate(newDate);
      setCurrentYearMonth(format(newDate, 'yyyy-MM'));
    }
  };

  const handleToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();

      // 오늘로 이동 후 현재 표시중인 날짜 가져오기
      const newDate = calendarApi.getDate();
      setSelectedDate(newDate);
      setCurrentYearMonth(format(newDate, 'yyyy-MM'));
    }
  };

  const handleViewModeChange = (
    mode: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek',
  ) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(mode);

      setViewMode(mode === 'dayGridMonth' ? 'month' : 'week');
    }
  };

  // 뷰 변경 시 핸들러
  const handleViewChange = (info: any) => {
    // 현재 보고 있는 월 업데이트
    const newMonth = format(info.view.currentStart, 'yyyy-MM');

    // 월이 변경되었다면 새로운 월의 데이터 로드
    if (newMonth !== currentYearMonth) {
      setCurrentYearMonth(newMonth);
    }

    // 뷰 모드 업데이트
    setViewMode(info.view.type === 'dayGridMonth' ? 'month' : 'week');
  };

  // 캘린더 크기 조정
  const updateCalendarSize = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  };

  return {
    currentYearMonth,
    selectedDate,
    reservations,
    viewMode,
    isLoading,
    refetchMonthly,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleViewModeChange,
    handleViewChange,
    updateCalendarSize,
  };
};
