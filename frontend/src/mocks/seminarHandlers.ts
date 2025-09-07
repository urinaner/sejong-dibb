import { http, HttpResponse } from 'msw';
import seminars from './data/seminars.json';

const seminarHandlers = [
  http.get('/api/seminar', () => {
    return HttpResponse.json({
      message: 'Success',
      page: 1,
      totalPage: 1,
      data: seminars,
    });
  }),
  http.get('/api/seminar/:id', ({ params }) => {
    const { id } = params;
    const seminar = seminars.find((s) => s.id === Number(id));
    return HttpResponse.json(seminar);
  }),
  http.post('/api/seminar', () => {
    return HttpResponse.json({ id: 3 }, { status: 201 });
  }),
  http.put('/api/seminar/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete('/api/seminar/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default seminarHandlers;
