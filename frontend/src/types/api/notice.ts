// types/api/notice.ts
import { ApiResponse, PaginationParams } from './common';
import { BoardReqDto } from '../../config/apiConfig';

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdDate: string;
  viewCount: number;
  category: string;
  fileList: string[];
}

export interface NoticeListResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NoticeItem[];
}

export interface NoticeResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NoticeItem[];
}

export type NoticeRequest = Omit<BoardReqDto, 'departmentId'> & {
  departmentId: 1;
  title: string;
  content: string;
  category: string;
  writer: string;
  createDate: string;
};

export type NoticeSingleResponse = NoticeItem;

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
