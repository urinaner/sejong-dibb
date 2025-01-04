export interface ReservationData {
  id: number;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  userName: string;
  purpose: '세미나' | '스터디' | '미팅' | '기타';
  contact: string;
  department?: string;
}

export interface TimeSlot {
  value: string;
  label: string;
}

export interface RoomInfo {
  id: string;
  name: string;
  capacity: number;
  location: string;
  image: string;
}
