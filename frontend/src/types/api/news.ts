// types/api/news.ts

// API 공통 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// 페이지네이션 파라미터 타입
export interface PaginationParams {
  page: number;
  size: number;
}

// 뉴스 아이템 타입
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  view: number;
  createDate: string;
  link: string;
  image: string;
}

// 뉴스 API 응답 타입
export interface NewsResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NewsItem[];
}

// 뉴스 생성/수정 요청 타입
export interface NewsRequest {
  title: string;
  content: string;
  link?: string;
  image?: string;
  createDate: string;
}

// 파일 업로드를 포함한 폼 데이터 타입
export interface NewsFormData extends Omit<NewsRequest, 'image'> {
  newsImage?: File;
}

// 페이지네이션된 뉴스 목록 응답 타입
export interface PaginatedNewsResponse {
  content: NewsItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// 뉴스 관련 모든 응답 타입
export type NewsListResponse = ApiResponse<NewsResponse>;
export type NewsSingleResponse = ApiResponse<NewsItem>;
export type NewsCreateResponse = ApiResponse<number>;
export type NewsUpdateResponse = ApiResponse<void>;
export type NewsDeleteResponse = ApiResponse<void>;

// 뉴스 검색 파라미터 타입
export interface NewsQueryParams extends PaginationParams {
  sort?: string[];
}
