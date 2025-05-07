// src/features/calendarReservation/hooks/useCalendarEvents.tsx
import { useState } from 'react';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import useReservationStore from '../store/reservationStore';
import { useReservationQuery } from './useReservationQuery';
import { Reservation } from '../types/reservation.types';

/**
 * 캘린더 이벤트 핸들링을 위한 커스텀 훅 (MUI Dialog 사용 버전)
 */
export const useCalendarEvents = (roomId: number, refetchData: () => void) => {
  // 모달 상태 관리
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  const [reservationFormOpen, setReservationFormOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<
    string | undefined
  >();
  const [selectedEndTime, setSelectedEndTime] = useState<string | undefined>();

  const {
    addReservation,
    updateReservation,
    deleteReservation,
    selectedReservation,
    setSelectedReservation,
  } = useReservationStore();

  const { useUpdateReservation } = useReservationQuery(roomId);
  const updateReservationMutation = useUpdateReservation();

  // 날짜 선택 핸들러 (새 예약 생성)
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedStartTime(selectInfo.startStr);
    setSelectedEndTime(selectInfo.endStr);
    setReservationFormOpen(true);
  };

  // 이벤트 클릭 핸들러 (예약 상세 보기)
  const handleEventClick = (clickInfo: EventClickArg) => {
    const reservation = clickInfo.event.extendedProps as Reservation;
    setSelectedReservation(reservation);
    setEventDetailOpen(true);
  };

  // 이벤트 드래그 핸들러
  const handleEventDrop = async (info: EventDropArg) => {
    if (!window.confirm('일정을 변경하시겠습니까?')) {
      info.revert();
      return;
    }

    const { event } = info;
    const reservation = event.extendedProps as Reservation;

    try {
      // 시간 차이 계산
      const startDelta =
        event.start!.getTime() - new Date(reservation.startTime).getTime();

      const updatedData = {
        ...reservation,
        startTime: event.start!.toISOString(),
        endTime: new Date(
          new Date(reservation.endTime).getTime() + startDelta,
        ).toISOString(),
      };

      await updateReservationMutation.mutateAsync({
        reservationId: reservation.id,
        data: updatedData,
      });

      // Zustand 스토어 업데이트
      updateReservation(reservation.id, updatedData);

      // 수정 후 데이터 다시 로드
      refetchData();

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
        endTime: event.end!.toISOString(),
      };

      await updateReservationMutation.mutateAsync({
        reservationId: reservation.id,
        data: updatedData,
      });

      // Zustand 스토어 업데이트
      updateReservation(reservation.id, updatedData);

      // 수정 후 데이터 다시 로드
      refetchData();

      alert('예약 시간이 변경되었습니다');
    } catch (error) {
      info.revert();
      console.error('Failed to update reservation time:', error);
      alert('예약 시간 변경에 실패했습니다');
    }
  };

  // 예약 저장 핸들러
  const handleSaveReservation = (newReservation: Reservation) => {
    if (selectedReservation) {
      // 수정
      updateReservation(newReservation.id, newReservation);
    } else {
      // 새 예약
      addReservation(newReservation);
    }

    // 모달 닫기
    handleCloseReservationForm();

    // 캘린더 갱신
    refetchData();
  };

  // 예약 삭제 핸들러
  const handleDeleteReservation = (id: number) => {
    deleteReservation(id);

    // 모달 닫기
    handleCloseEventDetail();

    // 캘린더 갱신
    refetchData();
  };

  // 예약 편집 모드로 전환
  const handleEditReservation = () => {
    if (selectedReservation) {
      // 상세 모달 닫기
      setEventDetailOpen(false);

      // 시작 및 종료 시간 설정
      setSelectedStartTime(selectedReservation.startTime);
      setSelectedEndTime(selectedReservation.endTime);

      // 약간의 지연 후 폼 모달 열기 (애니메이션 충돌 방지)
      setTimeout(() => {
        setReservationFormOpen(true);
      }, 100);
    }
  };

  // 이벤트 상세 모달 닫기
  const handleCloseEventDetail = () => {
    setEventDetailOpen(false);
    // 선택된 예약 정보 초기화 (지연)
    setTimeout(() => {
      setSelectedReservation(null);
    }, 300);
  };

  // 예약 폼 모달 닫기
  const handleCloseReservationForm = () => {
    setReservationFormOpen(false);
    // 선택된 정보 초기화 (지연)
    setTimeout(() => {
      setSelectedStartTime(undefined);
      setSelectedEndTime(undefined);
      setSelectedReservation(null);
    }, 300);
  };

  return {
    // 이벤트 핸들러
    handleDateSelect,
    handleEventClick,
    handleEventDrop,
    handleEventResize,

    // 모달 관련 상태 및 핸들러
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
  };
};
