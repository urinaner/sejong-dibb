export interface FilterState {
  category: string;
  sort: {
    field: SortField;
    direction: SortDirection;
  };
  page: number;
  size: number;
}

export interface ApiResponse {
  message: string; // API 응답 메시지
  page: number; // 현재 페이지
  totalPage: number; // 전체 페이지 수
  data: NoticeItem[]; // 게시글 데이터 배열
}

export type SortDirection = 'asc' | 'desc';

export interface NoticeState {
  notices: NoticeItem[];
  loading: boolean;
  error: string | null;
  pageInfo: {
    currentPage: number;
    totalPages: number;
    size: number;
  };
  filters: FilterState;
}

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  writer: string;
  createDate: string;
  category: string;
  file?: string;
}

export type SortField =
  | 'title'
  | 'content'
  | 'writer'
  | 'viewCount'
  | 'createDate';
