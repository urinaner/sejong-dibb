// src/types/api/news.ts
import { ApiResponse, PaginatedResponse } from '../index';

export interface NewsRequest {
  title: string;
  content: string;
  link?: string;
  image?: string;
  createDate: string;
}

export interface NewsResponse {
  id: number;
  title: string;
  content: string;
  link: string;
  image: string;
  createDate: string;
  view: number;
}

// Form Data로 전송할 때 사용할 타입
export interface NewsFormData extends Omit<NewsRequest, 'image'> {
  newsImage?: File;
}

// 페이지네이션 파라미터 타입
export interface NewsQueryParams {
  page: number;
  size: number;
  sort?: string[];
}

// News 관련된 모든 응답 타입들
export type NewsListResponse = ApiResponse<PaginatedResponse<NewsResponse>>;
export type NewsSingleResponse = ApiResponse<NewsResponse>;
export type NewsCreateResponse = ApiResponse<number>; // 생성된 뉴스의 ID 반환
export type NewsUpdateResponse = ApiResponse<NewsResponse>;
export type NewsDeleteResponse = ApiResponse<void>;
