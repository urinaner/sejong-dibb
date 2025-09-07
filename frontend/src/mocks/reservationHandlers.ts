import { http, HttpResponse } from 'msw';
import reservations from './data/reservations.json';

const reservationHandlers = [
  http.get('/api/reservation/admin/all', () => {
    return HttpResponse.json(reservations);
  }),

  http.get('/api/reservation/my-list', () => {
    // Assuming user with ID 1 is the one making the request
    const myReservations = reservations.filter((r) => r.userId === 1);
    return HttpResponse.json(myReservations);
  }),

  http.post('/api/reservation', async ({ request }) => {
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

  http.put('/api/reservation/:id', async ({ request, params }) => {
    const { id } = params;
    const updatedReservation = (await request.json()) as any;
    const index = reservations.findIndex((r) => r.id === Number(id));
    if (index > -1) {
      reservations[index] = { ...reservations[index], ...updatedReservation };
      return HttpResponse.json(reservations[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.delete('/api/reservation/:id', ({ params }) => {
    const { id } = params;
    const index = reservations.findIndex((r) => r.id === Number(id));
    if (index > -1) {
      reservations.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

export default reservationHandlers;
