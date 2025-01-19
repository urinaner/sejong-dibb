import { PaginatedResponse } from './common';

// 교수 기본 정보
export interface Professor {
  id: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}

// 교수 상세 정보
export interface ProfessorDetail extends Professor {
  education: string[];
  career: string[];
  awards: string[];
}

// 교수 생성/수정 요청 DTO
export interface ProfessorRequest {
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  departmentId: number;
}

// 교수 API 응답 타입
export interface ProfessorListResponse {
  message: string;
  page: number;
  totalPage: number; // totalPages가 아닌 totalPage
  data: Professor[]; // content가 아닌 data
}
export interface ProfessorResponse {
  data: Professor;
  message: string;
  status: number;
}
export interface ProfessorDetailResponse {
  id: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}
export interface ProfessorCreateResponse {
  data: number;
  message: string;
  status: number;
}
export interface ProfessorUpdateResponse {
  message: string;
  status: number;
}
export interface ProfessorDeleteResponse {
  message: string;
  status: number;
}

// 파일 업로드를 포함한 폼 데이터 타입
export interface ProfessorFormData extends ProfessorRequest {
  profileImage?: File;
}

// 쿼리 파라미터 타입
export interface ProfessorQueryParams {
  page: number;
  size: number;
  sort?: string[];
}
