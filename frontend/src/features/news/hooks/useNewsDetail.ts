// src/features/news/hooks/useNewsDetail.ts
import { useEntityDetail } from '../../../shared/hooks/useEntityDetail';
import { newsService } from '../services/newsService';
import type { News } from '../types';

export function useNewsDetail(id: number | null) {
  return useEntityDetail<News>(
    (newsId) => newsService.fetchDetail(newsId),
    id,
    { enabled: !!id },
  );
}
