import moment from 'moment';
import { TimeSlot, ReservationData } from '../types/reservation.types';

export const formatDate = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const formatTime = (time: string): string => {
  return moment(time, 'HH:mm').format('HH:mm');
};

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        value: time,
        label: time,
      });
    }
  }
  return slots;
};

export const isTimeSlotAvailable = (
  startTime: string,
  endTime: string,
  existingReservations: ReservationData[],
): boolean => {
  const newStart = moment(startTime, 'HH:mm');
  const newEnd = moment(endTime, 'HH:mm');

  return !existingReservations.some((reservation) => {
    const existingStart = moment(reservation.startTime, 'HH:mm');
    const existingEnd = moment(reservation.endTime, 'HH:mm');

    return (
      (newStart.isSameOrAfter(existingStart) &&
        newStart.isBefore(existingEnd)) ||
      (newEnd.isAfter(existingStart) && newEnd.isSameOrBefore(existingEnd)) ||
      (newStart.isSameOrBefore(existingStart) &&
        newEnd.isSameOrAfter(existingEnd))
    );
  });
};
