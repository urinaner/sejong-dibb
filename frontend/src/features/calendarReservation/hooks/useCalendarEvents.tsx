// src/features/calendarReservation/components/Calendar/hooks/useCalendarEvents.ts
import { useModal } from '../../../components/Modal';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import useReservationStore from '../store/reservationStore';
import { useReservationQuery } from '../hooks/useReservationQuery';
import ReservationForm from '../components/Calendar/components/ReservationForm';
import EventDetailModal from '../components/Calendar/components/EventDetailModal';
import { Reservation } from '../types/reservation.types';

/**
 * 캘린더 이벤트 핸들링을 위한 커스텀 훅
 */
export const useCalendarEvents = (roomId: number, refetchData: () => void) => {
  const { openModal } = useModal();
  const {
    addReservation,
    updateReservation,
    deleteReservation,
    setSelectedReservation,
  } = useReservationStore();

  const {
    useUpdateReservation,
    useDeleteReservation,
  } = useReservationQuery(roomId);

  // 날짜 선택 핸들러 (새 예약 생성)
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    openModal(
      <ReservationForm
        roomId={roomId}
    startTime={selectInfo.startStr}
    endTime={selectInfo.endStr}
    onSave={(newReservation) => {
      addReservation(newReservation);
      // 현재 표시 중인 월의 데이터 다시 로드
      refetchData();
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
      // 삭제 후 데이터 다시 로드
      refetchData();
    }}
    onEdit={() => {
      openModal(
        <ReservationForm
          roomId={roomId}
      reservation={reservation}
      onSave={(updatedReservation) => {
        updateReservation(updatedReservation.id, updatedReservation);
        // 수정 후 데이터 다시 로드
        refetchData();
      }}
      />,
    );
    }}
    />,
  );
  };

  // 이벤트 드래그 핸들러
  const handleEventDrop = async (info: any) => {
    if (!window.confirm('일정을 변경하시겠습니까?')) {
      info.revert();
      return;
    }

    const { event } = info;
    const reservation = event.extendedProps as Reservation;
    const updateReservationMutation = useUpdateReservation();

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
    const updateReservationMutation = useUpdateReservation();

    try {
      const updatedData = {
        ...reservation,
        endTime: event.end.toISOString(),
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

  return {
    handleDateSelect,
    handleEventClick,
    handleEventDrop,
    handleEventResize
  };
};
