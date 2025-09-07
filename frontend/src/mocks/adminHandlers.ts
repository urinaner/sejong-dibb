import { http, HttpResponse } from 'msw';

const adminHandlers = [
  http.post('/api/admin/validate/1', () => {
    return HttpResponse.json({ isValid: true });
  }),
  http.post('/api/admin/1', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default adminHandlers;
