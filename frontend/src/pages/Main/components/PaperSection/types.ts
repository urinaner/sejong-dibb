export interface Paper {
  id: number;
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

// API 응답 타입 정의
export interface ThesisResponse {
  message: string;
  page: number;
  totalPage: number;
  data: Paper[];
}

// 필터 타입 정의
export interface ThesisFilter {
  page: number;
  size: number;
}
