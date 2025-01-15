export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
