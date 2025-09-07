import { http, HttpResponse } from 'msw';
import news from './data/news.json';

const newsHandlers = [
  http.get('/api/news', () => {
    return HttpResponse.json({
      message: 'Success',
      page: 1,
      totalPage: 1,
      data: news,
    });
  }),
  http.get('/api/news/:id', ({ params }) => {
    const { id } = params;
    const singleNews = news.find((n) => n.id === Number(id));
    return HttpResponse.json(singleNews);
  }),
  http.post('/api/news', () => {
    return HttpResponse.json({ id: 3 }, { status: 201 });
  }),
  http.put('/api/news/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete('/api/news/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.post('/api/news/:id/attachment', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default newsHandlers;
