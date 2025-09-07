import { http, HttpResponse } from 'msw';
import reservations from './data/reservations.json';

// NOTE: 앱 실제 엔드포인트 규약에 맞춘 핸들러 (/api/room/:roomId/reservation...)
const roomReservationHandlers = [
  // 월간 예약 목록: /api/room/:roomId/reservation/month?yearMonth=YYYY-MM
  http.get('/api/room/:roomId/reservation/month', ({ params, request }) => {
    const { roomId } = params as { roomId: string };
    const url = new URL(request.url);
    const yearMonth = url.searchParams.get('yearMonth');

    const filtered = reservations.filter((r) => {
      const sameRoom = String(r.roomId) === String(roomId);
      if (!yearMonth) return sameRoom;
      // 단순 startsWith 비교 (YYYY-MM)
      return (
        sameRoom &&
        (r.startTime.startsWith(yearMonth) || r.endTime.startsWith(yearMonth))
      );
    });
    return HttpResponse.json(filtered);
  }),

  // 일간 예약 목록: /api/room/:roomId/reservation?date=YYYY-MM-DD
  http.get('/api/room/:roomId/reservation', ({ params, request }) => {
    const { roomId } = params as { roomId: string };
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const filtered = reservations.filter((r) => {
      const sameRoom = String(r.roomId) === String(roomId);
      if (!date) return sameRoom;
      return (
        sameRoom && (r.startTime.startsWith(date) || r.endTime.startsWith(date))
      );
    });
    return HttpResponse.json(filtered);
  }),

  // 생성: /api/room/:roomId/reservation
  http.post('/api/room/:roomId/reservation', async ({ params, request }) => {
    const { roomId } = params as { roomId: string };
    const body = (await request.json()) as any;
    const id = reservations.length + 1;
    const now = new Date().toISOString();
    const reservation = {
      id,
      roomId: Number(roomId),
      status: 'PENDING',
      userId: 0,
      ...(typeof body === 'object' && body ? body : {}),
      createdAt: now,
      updatedAt: now,
    } as any;
    (reservations as any).push(reservation);
    return HttpResponse.json(reservation, { status: 201 });
  }),

  // 단건 조회: /api/room/:roomId/reservation/:reservationId
  http.get('/api/room/:roomId/reservation/:reservationId', ({ params }) => {
    const { roomId, reservationId } = params as {
      roomId: string;
      reservationId: string;
    };
    const found = (reservations as any).find(
      (r: any) =>
        String(r.id) === String(reservationId) &&
        String(r.roomId) === String(roomId),
    );
    if (found) return HttpResponse.json(found);
    return new HttpResponse(null, { status: 404 });
  }),

  // 업데이트: /api/room/:roomId/reservation/:reservationId
  http.put(
    '/api/room/:roomId/reservation/:reservationId',
    async ({ params, request }) => {
      const { roomId, reservationId } = params as {
        roomId: string;
        reservationId: string;
      };
      const body = (await request.json()) as any;
      const index = (reservations as any).findIndex(
        (r: any) =>
          String(r.id) === String(reservationId) &&
          String(r.roomId) === String(roomId),
      );
      if (index > -1) {
        (reservations as any)[index] = {
          ...(reservations as any)[index],
          ...(typeof body === 'object' && body ? body : {}),
          updatedAt: new Date().toISOString(),
        };
        return HttpResponse.json((reservations as any)[index]);
      }
      return new HttpResponse(null, { status: 404 });
    },
  ),

  // 삭제: /api/room/:roomId/reservation/:reservationId
  http.delete('/api/room/:roomId/reservation/:reservationId', ({ params }) => {
    const { roomId, reservationId } = params as {
      roomId: string;
      reservationId: string;
    };
    const index = (reservations as any).findIndex(
      (r: any) =>
        String(r.id) === String(reservationId) &&
        String(r.roomId) === String(roomId),
    );
    if (index > -1) {
      (reservations as any).splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

export default roomReservationHandlers;
