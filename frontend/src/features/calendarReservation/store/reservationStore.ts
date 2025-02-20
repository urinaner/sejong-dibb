import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 타입 정의
type ViewMode = 'month' | 'week' | 'day';

interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
  purpose: 'MEETING' | 'SEMINAR' | 'CLASS' | 'OTHER';
  etc?: string;
  userId: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

interface CalendarEvent extends Omit<Reservation, 'startTime' | 'endTime'> {
  start: Date;
  end: Date;
  title: string;
  isFixed?: boolean;
}

interface ReservationState {
  viewMode: ViewMode;
  selectedDate: Date;
  reservations: Reservation[];
  selectedReservation: Reservation | null;
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

interface ReservationActions {
  setViewMode: (mode: ViewMode) => void;
  setSelectedDate: (date: Date) => void;
  setReservations: (reservations: Reservation[]) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: number, updates: Partial<Reservation>) => void;
  deleteReservation: (id: number) => void;
  setSelectedReservation: (reservation: Reservation | null) => void;
  toggleModal: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

type ReservationStore = ReservationState & ReservationActions;

const useReservationStore = create<ReservationStore>()(
  devtools(
    persist(
      (set) => ({
        // 초기 상태
        viewMode: 'month',
        selectedDate: new Date(),
        reservations: [],
        selectedReservation: null,
        isModalOpen: false,
        isLoading: false,
        error: null,

        // 액션
        setViewMode: (mode) => set({ viewMode: mode }),

        setSelectedDate: (date) => set({ selectedDate: date }),

        setReservations: (reservations) => set({ reservations }),

        addReservation: (reservation) =>
          set((state) => ({
            reservations: [...state.reservations, reservation],
          })),

        updateReservation: (id, updates) =>
          set((state) => ({
            reservations: state.reservations.map((res) =>
              res.id === id ? { ...res, ...updates } : res,
            ),
          })),

        deleteReservation: (id) =>
          set((state) => ({
            reservations: state.reservations.filter((res) => res.id !== id),
          })),

        setSelectedReservation: (reservation) =>
          set({
            selectedReservation: reservation,
          }),

        toggleModal: () =>
          set((state) => ({
            isModalOpen: !state.isModalOpen,
          })),

        setError: (error) => set({ error }),

        setLoading: (loading) => set({ isLoading: loading }),
      }),
      {
        name: 'reservation-storage',
        partialize: (state) => ({
          viewMode: state.viewMode,
          selectedDate: state.selectedDate,
        }),
      },
    ),
  ),
);

export default useReservationStore;
