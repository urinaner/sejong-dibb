// src/features/news/types.ts
export interface News {
  id: number;
  title: string;
  content: string;
  view: number;
  createDate: string;
  link: string;
  image: string;
}

export interface NewsListResponse {
  message: string;
  page: number;
  totalPage: number;
  data: News[];
}

export interface NewsFormData {
  title: string;
  content: string;
  link?: string;
  createDate: string;
}
