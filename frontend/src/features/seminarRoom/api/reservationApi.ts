import { axiosInstance } from '../../../config/apiConfig';
import { Reservation } from '../types/reservation.types';
import { ReservationCreateDto } from '../../calendarReservation/types/reservation.types';

class ReservationApi {
  private BASE_PATH = '/api/room';

  async getMonthlyReservations(
    roomId: number,
    yearMonth: string,
  ): Promise<Reservation[]> {
    const response = await axiosInstance.get(
      `${this.BASE_PATH}/${roomId}/reservation/month`,
      { params: { yearMonth } },
    );
    return response.data;
  }

  async getDailyReservations(
    roomId: number,
    date: string,
  ): Promise<Reservation[]> {
    const response = await axiosInstance.get(
      `${this.BASE_PATH}/${roomId}/reservation`,
      { params: { date } },
    );
    return response.data;
  }

  async createReservation(
    roomId: number,
    data: ReservationCreateDto,
  ): Promise<Reservation> {
    const response = await axiosInstance.post(
      `${this.BASE_PATH}/${roomId}/reservation`,
      data,
    );
    return response.data;
  }

  async updateReservation(
    roomId: number,
    reservationId: number,
    data: Partial<Reservation>,
  ): Promise<Reservation> {
    const response = await axiosInstance.put(
      `${this.BASE_PATH}/${roomId}/reservation/${reservationId}`,
      data,
    );
    return response.data;
  }

  async deleteReservation(
    roomId: number,
    reservationId: number,
  ): Promise<void> {
    await axiosInstance.delete(
      `${this.BASE_PATH}/${roomId}/reservation/${reservationId}`,
    );
  }
}

export const reservationApi = new ReservationApi();
