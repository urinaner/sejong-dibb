import { useNavigate } from 'react-router-dom';
import {
  NewsSection as NewsSectionContainer,
  NewsTitle,
} from '../../MainStyle';
import NewsSlider from '../../../../components/NewsSlider/NewsSlider';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { useGetNewsList } from '../../../../hooks/queries/useNews';
import { NewsItem } from './types';

export const NewsSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetNewsList({
    page: 0,
    size: 8,
  });

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>뉴스를 불러오는데 실패했습니다.</div>;

  const news = data?.data || [];

  return (
    <NewsSectionContainer>
      <NewsTitle>바융 뉴스</NewsTitle>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        바이오융학공학전공의 주요 새소식을 전해드립니다.
      </p>
      {news.length === 0 ? (
        <p>등록된 뉴스가 없습니다.</p>
      ) : (
        <NewsSlider
          news={news}
          autoPlayInterval={5000}
          onNewsClick={handleNewsClick}
        />
      )}
    </NewsSectionContainer>
  );
};
