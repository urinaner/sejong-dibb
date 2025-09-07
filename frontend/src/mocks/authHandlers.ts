import { http, HttpResponse } from 'msw';

const authHandlers = [
  http.post('/api/member/login', async ({ request }) => {
    const { loginId } = (await request.json()) as { loginId: string };
    // 간단한 JWT 페이로드를 가진 base64 토큰 (헤더.페이로드.시그니처)
    const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        loginId,
        role: 'ROLE_USER',
        iat: 0,
        exp: 1893456000,
      }),
    );
    const accessToken = `${header}.${payload}.`;
    const refreshToken = `${header}.${payload}.refresh`;
    return HttpResponse.json({ accessToken, refreshToken });
  }),

  http.post('/api/admin/login', async () => {
    const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        loginId: 'admin',
        role: 'ROLE_ADMIN',
        iat: 0,
        exp: 1893456000,
      }),
    );
    const accessToken = `${header}.${payload}.`;
    const refreshToken = `${header}.${payload}.refresh`;
    return HttpResponse.json({ accessToken, refreshToken });
  }),

  http.post('/api/member/refresh', () => {
    const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        loginId: 'user',
        role: 'ROLE_USER',
        iat: 0,
        exp: 1893456000,
      }),
    );
    const accessToken = `${header}.${payload}.`;
    const refreshToken = `${header}.${payload}.refresh`;
    return HttpResponse.json({ accessToken, refreshToken });
  }),

  http.post('/api/member/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default authHandlers;
