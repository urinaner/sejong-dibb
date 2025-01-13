// types/api/notice.ts
import { ApiResponse, PaginationParams } from './common';
import { BoardReqDto } from '../../config/apiConfig';

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  viewCount: number;
  createdDate: string;
  category: string;
  fileList?: string[];
}

export interface NoticeResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NoticeItem[];
}

export type NoticeRequest = Omit<BoardReqDto, 'departmentId'> & {
  departmentId: 1; // 리터럴 타입으로 고정
};

export interface NoticeFormData extends Omit<NoticeRequest, 'fileList'> {
  files?: File[];
}

export interface PaginatedNoticeResponse {
  content: NoticeItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export type NoticeListResponse = ApiResponse<NoticeResponse>;
export type NoticeSingleResponse = ApiResponse<NoticeItem>;
export type NoticeCreateResponse = ApiResponse<number>;
export type NoticeUpdateResponse = ApiResponse<void>;
export type NoticeDeleteResponse = ApiResponse<void>;

export interface NoticeQueryParams extends PaginationParams {
  category?: string;
  sort?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export const noticeKeys = {
  all: ['notices'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (params: NoticeQueryParams) => [...noticeKeys.lists(), params] as const,
  details: () => [...noticeKeys.all, 'detail'] as const,
  detail: (id: number) => [...noticeKeys.details(), id] as const,
};
