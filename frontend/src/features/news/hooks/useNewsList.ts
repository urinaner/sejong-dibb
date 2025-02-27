// src/features/news/hooks/useNewsList.ts
import { useEntityList } from '../../../shared/hooks/useEntityList';
import { newsService } from '../services/newsService';
import type { News } from '../types';

export function useNewsList(initialPage = 1, pageSize = 10) {
  return useEntityList<News>(
    (params) =>
      newsService.fetchList({
        page: params.page,
        size: params.size,
      }),
    {
      page: initialPage - 1, // Convert to 0-based for API
      size: pageSize,
    },
  );
}
