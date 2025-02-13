// src/features/seminarRoom/types/reservation.types.ts
export interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
  purpose: ReservationPurpose;
  etc?: string;
  userId: number;
  status: ReservationStatus;
}

export type ReservationPurpose = 'MEETING' | 'SEMINAR' | 'CLASS' | 'OTHER';
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type ViewMode = 'month' | 'week' | 'day';

export interface CalendarEvent
  extends Omit<Reservation, 'startTime' | 'endTime'> {
  start: Date;
  end: Date;
  title: string;
  isFixed?: boolean;
}
