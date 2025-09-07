import { http, HttpResponse } from 'msw';
import notices from './data/notices.json';

const noticeHandlers = [
  // Intercepts GET /api/board/category/:category
  http.get('/api/board/category/:category', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '5';

    // You can filter notices by category if you want.
    // const { category } = params;
    // const filteredNotices = notices.filter(n => n.category === category);

    return HttpResponse.json({
      message: 'Success',
      page: parseInt(page, 10),
      totalPage: Math.ceil(notices.length / parseInt(size, 10)),
      data: notices,
    });
  }),

  // Intercepts GET /api/board
  http.get('/api/board', () => {
    return HttpResponse.json({
      message: 'Success',
      page: 1,
      totalPage: 1,
      data: notices,
    });
  }),

  // Intercepts GET /api/board/:id
  http.get('/api/board/:id', ({ params }) => {
    const { id } = params;
    const notice = notices.find((n) => n.id === Number(id));
    if (notice) {
      return HttpResponse.json(notice);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Intercepts POST /api/board
  http.post('/api/board', () => {
    return HttpResponse.json({ id: Date.now() }, { status: 201 });
  }),

  // Intercepts PUT /api/board/:id
  http.put('/api/board/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Intercepts DELETE /api/board/:id
  http.delete('/api/board/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default noticeHandlers;
