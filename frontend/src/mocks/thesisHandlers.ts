import { http, HttpResponse } from 'msw';
import theses from './data/theses.json';

const thesisHandlers = [
  http.get('/api/thesis', () => {
    return HttpResponse.json({
      message: 'Success',
      page: 1,
      totalPage: 1,
      data: theses,
    });
  }),
  http.get('/api/thesis/:id', ({ params }) => {
    const { id } = params;
    const thesis = theses.find((t) => t.id === Number(id));
    return HttpResponse.json(thesis);
  }),
  http.post('/api/thesis', () => {
    return HttpResponse.json({ id: 3 }, { status: 201 });
  }),
  http.put('/api/thesis/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete('/api/thesis/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default thesisHandlers;
