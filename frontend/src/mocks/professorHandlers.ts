import { http, HttpResponse } from 'msw';
import professors from './data/professors.json';

const professorHandlers = [
  http.get('/api/professor', () => {
    return HttpResponse.json({
      message: 'Success',
      page: 1,
      totalPage: 1,
      data: professors,
    });
  }),
  http.get('/api/professor/:id', ({ params }) => {
    const { id } = params;
    const professor = professors.find((p) => p.id === Number(id));
    return HttpResponse.json(professor);
  }),
  http.post('/api/professor', () => {
    return HttpResponse.json({ id: 3 }, { status: 201 });
  }),
  http.put('/api/professor/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete('/api/professor/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default professorHandlers;
