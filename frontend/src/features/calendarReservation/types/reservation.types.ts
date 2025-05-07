// src/features/calendarReservation/types/reservation.types.ts
export type ReservationPurpose = 'SEMINAR' | 'CLASS' | 'MEETING' | 'OTHER';
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Reservation {
  id: number;
  roomId?: number;
  startTime: string;
  endTime: string;
  purpose: ReservationPurpose;
  etc?: string;
  userId: number;
  status: ReservationStatus;
  createdAt: string; // 필수 필드로 변경
  updatedAt: string; // 필수 필드로 변경
}
export interface ReservationCreateDto {
  startTime: string;
  endTime: string;
  purpose: ReservationPurpose;
  etc?: string;
  status: ReservationStatus;
  userId: number;
}
