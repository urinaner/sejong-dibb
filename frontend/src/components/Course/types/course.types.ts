// types/course.types.ts
export type CourseType = "BS" | "MS"; // 기존 UNDERGRADUATE, GRADUATE에서 변경

export interface Course {
  id?: number;
  courseType: CourseType;
  courseNumber: string;
  courseName: string;
  courseNameEn: string;
  creditTime: string | number;
  year: number; // 연도 추가
  semester: number; // 학기
  grade?: number; // 학년 추가 (BS만 해당)
  classification?: string; // 이수구분 (BS만 해당)
  courseDescription?: string; // 교과목표 한글
  courseDescriptionEn?: string; // 교과목표 영문
}

// API 요청 DTO
export interface CourseReqDto {
  courseType: CourseType;
  courseNumber: string;
  courseName: string;
  courseNameEn: string;
  creditTime: string | number;
  year: number;
  semester: number;
  grade?: number; // BS만 해당
  classification?: string; // BS만 해당
  courseDescription?: string;
  courseDescriptionEn?: string;
}

// 쿼리 파라미터 타입
export interface CourseQueryParams {
  type: CourseType;
  year?: number;
  grade?: number;
}

// API 응답 타입
export interface CourseListResponse {
  content: Course[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
