import { useEffect } from 'react';
import { useGetNewsList } from '../../../hooks/queries/useNews';
import { useThesisList } from '../../../hooks/queries/useThesis';
import { useSeminarList } from '../../../hooks/queries/useSeminar';

export const useMainPageData = () => {
  const news = useGetNewsList({ page: 0, size: 8 });
  const papers = useThesisList({ page: 0, size: 4 });
  const seminar = useSeminarList({
    page: 0,
    size: 1,
    sortDirection: 'DESC',
  });

  useEffect(() => {
    // 에러 발생시 처리
    if (news.error) console.error('News loading error:', news.error);
    if (papers.error) console.error('Papers loading error:', papers.error);
    if (seminar.error) console.error('Seminar loading error:', seminar.error);
  }, [news.error, papers.error, seminar.error]);

  return {
    news,
    papers,
    seminar,
    isLoading: news.isLoading || papers.isLoading || seminar.isLoading,
    hasError: !!(news.error || papers.error || seminar.error),
  };
};
