// types/api/seminar.ts
import { ApiResponse } from './common';

// 세미나 아이템 타입
export interface SeminarItem {
  id: number;
  name: string;
  writer: string;
  place: string;
  startTime: string;
  endTime: string;
  speaker: string;
  company: string;
}

// 세미나 생성/수정 요청 타입
export interface SeminarReqDto extends Omit<SeminarItem, 'id'> {
  name: string;
  writer: string;
  place: string;
  startTime: string;
  endTime: string;
  speaker: string;
  company: string;
}

// 세미나 API 응답 타입
export interface SeminarResponse {
  message: string;
  page: number;
  totalPage: number;
  data: SeminarItem[];
}

// 세미나 검색 파라미터 타입
export interface SeminarFilter {
  page: number;
  size: number;
  sortDirection?: 'ASC' | 'DESC';
}

// 세미나 관련 모든 응답 타입
export type SeminarListResponse = ApiResponse<SeminarResponse>;
export type SeminarSingleResponse = ApiResponse<SeminarItem>;
export type SeminarCreateResponse = ApiResponse<number>;
export type SeminarUpdateResponse = ApiResponse<void>;
export type SeminarDeleteResponse = ApiResponse<void>;
