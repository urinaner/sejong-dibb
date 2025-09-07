import { http, HttpResponse } from 'msw';
import reservations from './data/reservations.json';

const seminarRoomHandlers = [
  http.get('/api/reservation/seminar-room', () => {
    return HttpResponse.json(reservations);
  }),

  http.get('/api/reservation/seminar-room/:id', ({ params }) => {
    const { id } = params;
    const reservation = reservations.find((r) => r.id === Number(id));
    if (reservation) {
      return HttpResponse.json(reservation);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.post('/api/reservation/seminar-room', async ({ request }) => {
    const newReservation = (await request.json()) as any;
    const id = reservations.length + 1;
    const reservation: any = {
      id,
      roomId: 0, // default value
      userId: 0, // default value
      status: 'PENDING', // default value
      ...newReservation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    reservations.push(reservation);
    return HttpResponse.json(reservation, { status: 201 });
  }),

  http.put('/api/reservation/seminar-room/:id', async ({ request, params }) => {
    const { id } = params;
    const updatedReservation = (await request.json()) as any;
    const index = reservations.findIndex((r) => r.id === Number(id));
    if (index > -1) {
      reservations[index] = { ...reservations[index], ...updatedReservation };
      return HttpResponse.json(reservations[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.delete('/api/reservation/seminar-room/:id', ({ params }) => {
    const { id } = params;
    const index = reservations.findIndex((r) => r.id === Number(id));
    if (index > -1) {
      reservations.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

export default seminarRoomHandlers;
