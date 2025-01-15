import type {
  NewsItem,
  NewsRequest as BaseNewsRequest,
  NewsResponse,
  PaginationParams,
  ApiResponse,
  PaginatedResponse,
} from '../../types/api';

export interface NewsFormRequest extends Omit<BaseNewsRequest, 'image'> {
  image?: File;
}
