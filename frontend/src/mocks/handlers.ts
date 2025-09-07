import { http, HttpResponse } from 'msw';
import courses from './data/courses.json';

const courseHandlers = [
  // Get all courses
  http.get('/api/courses', () => {
    return HttpResponse.json(courses);
  }),

  // Get a single course
  http.get('/api/course/:id', ({ params }) => {
    const { id } = params;
    const course = courses.find((c) => c.id === Number(id));
    if (course) {
      return HttpResponse.json(course);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Create a new course
  http.post('/api/course', async ({ request }) => {
    const newCourse = (await request.json()) as object;
    const id = courses.length + 1;
    const course = { id, ...newCourse };
    courses.push(course as any);
    return HttpResponse.json(course, { status: 201 });
  }),

  // Delete a course
  http.delete('/api/course/:id', ({ params }) => {
    const { id } = params;
    const index = courses.findIndex((c) => c.id === Number(id));
    if (index > -1) {
      courses.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Upload courses
  http.post('/api/course/upload', () => {
    // This is a simplified mock.
    // In a real scenario, you might want to process the uploaded file.
    return HttpResponse.json({ message: 'Upload successful' });
  }),
];

import authHandlers from './authHandlers';

import reservationHandlers from './reservationHandlers';

import seminarRoomHandlers from './seminarRoomHandlers';

import newsHandlers from './newsHandlers';
import noticeHandlers from './noticeHandlers';
import professorHandlers from './professorHandlers';
import seminarHandlers from './seminarHandlers';
import thesisHandlers from './thesisHandlers';
import adminHandlers from './adminHandlers';
import roomReservationHandlers from './roomReservationHandlers';

export const handlers = [
  ...courseHandlers,
  ...authHandlers,
  ...reservationHandlers,
  ...roomReservationHandlers,
  ...seminarRoomHandlers,
  ...newsHandlers,
  ...noticeHandlers,
  ...professorHandlers,
  ...seminarHandlers,
  ...thesisHandlers,
  ...adminHandlers,
];
