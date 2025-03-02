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
  academicBackground?:
    | string
    | null
    | {
        bachelor?: string;
        master?: string;
        doctor?: string;
        [key: string]: string | undefined;
      };
}

export interface ProfessorFormData {
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
  academicBackground: string;
  departmentId: number;
}

export interface ProfessorListResponse {
  message: string;
  totalPage: number;
  page: number;
  data: Professor[];
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

export interface ProfessorDetailResponse extends Professor {
  education: string[];
  career: string[];
  awards: string[];
}
