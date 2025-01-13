// src/lib/axios/index.ts
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// API 에러 타입 정의
interface ApiErrorResponse {
  message: string;
  status: number;
  data?: any;
}

// 인스턴스 생성 함수
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 토큰이 필요한 경우
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        // 서버 응답이 있는 경우
        const { status, data } = error.response;

        switch (status) {
          case 401:
            // 인증 에러 처리
            localStorage.removeItem('token');
            // 로그인 페이지로 리다이렉트 등의 처리
            break;
          case 403:
            // 권한 에러 처리
            break;
          case 404:
            // Not Found 처리
            break;
          case 500:
            // 서버 에러 처리
            break;
        }

        return Promise.reject({
          message: data?.message || '에러가 발생했습니다.',
          status: status,
          data: data,
        });
      }

      if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        return Promise.reject({
          message: '서버에 연결할 수 없습니다.',
          status: 503,
        });
      }

      // 요청 자체를 보내지 못한 경우
      return Promise.reject({
        message: '요청을 보낼 수 없습니다.',
        status: 0,
      });
    },
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();

// API 에러 핸들러
export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message || '알 수 없는 에러가 발생했습니다.',
      status: error.response?.status || 500,
      data: error.response?.data,
    };
  }
  return {
    message: '알 수 없는 에러가 발생했습니다.',
    status: 500,
  };
};

// axios 타입 가드
export const isAxiosError = axios.isAxiosError;

export default axiosInstance;
