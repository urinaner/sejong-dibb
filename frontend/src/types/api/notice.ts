// 기존 타입들은 유지하면서 NoticeSearchParams 타입 추가

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdDate: string;
  viewCount: number;
  category: string;
  fileList?: string[];
}

export interface NoticeListResponse {
  message?: string;
  page: number;
  totalPage: number;
  data: NoticeItem[];
}

export type NoticeSingleResponse = NoticeItem;

export interface NoticeRequest {
  title: string;
  content: string;
  writer: string;
  createDate: string;
  category: string;
  departmentId: number;
}

export interface NoticeCreateResponse {
  message: string;
  id: number;
}

export interface NoticeUpdateResponse {
  message: string;
  id: number;
}

export interface NoticeDeleteResponse {
  message: string;
}

export interface NoticeQueryParams {
  category?: string;
  page: number;
  size: number;
  sort?: string;
  sortDirection?: 'ASC' | 'DESC';
}

// 검색을 위한 새로운 타입 정의
export interface NoticeSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}
