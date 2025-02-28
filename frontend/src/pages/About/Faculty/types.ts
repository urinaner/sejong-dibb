// src/pages/about/faculty/types.ts
export interface Professor {
  id: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string | null;
  academicBackground?: string | null;
}

export interface ProfessorFormData {
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string | null;
  academicBackground: string | null;
  departmentId: number;
}

export interface ProfessorListResponse {
  message: string;
  totalPage: number;
  page: number;
  data: Professor[];
}

export interface ProfessorDetailResponse extends Professor {
  education: string[];
  career: string[];
  awards: string[];
}

export interface ThesisResponse {
  message: string;
  page: number;
  totalPage: number;
  data: Thesis[];
}

export interface Thesis {
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
  thesisImage: string;
  publicationCollection: string;
  publicationIssue: string;
  publicationPage: string;
  issn: string;
  professorId: number;
}

export interface ProfessorQueryParams {
  page: number;
  size: number;
  sort?: string;
}

// ProfessorDetailResponse 타입도 수정
// types.ts 파일 수정
export interface ProfessorDetailResponse
  extends Omit<Professor, 'academicBackground'> {
  education: string[];
  career: string[];
  awards: string[];
  // academicBackground 속성 추가
  academicBackground?: string | null;
}
