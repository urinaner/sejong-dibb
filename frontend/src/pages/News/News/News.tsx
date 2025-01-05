import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import moment from 'moment';
import {
  Container,
  NewsGrid,
  NewsCard,
  NewsImage,
  NewsContent,
  NewsTitle,
  NewsDate,
  NewsDescription,
  NewsFooter,
  NewsViews,
  Pagination,
} from './NewsStyle';
import { apiEndpoints } from '../../../config/apiConfig';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  view: number;
  createDate: string;
  link: string;
  image: string;
}

interface NewsResponse {
  message: string;
  page: number;
  totalPage: number;
  data: NewsItem[];
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const pageSize = 10;

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        apiEndpoints.news.listWithPage(currentPage, pageSize),
      );
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data: NewsResponse = await response.json();
      setNews(data.data);
      setTotalPages(data.totalPage);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    return (
      <Pagination>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          다음
        </button>
      </Pagination>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <NewsGrid>
        {news.map((item) => (
          <NewsCard key={item.id} onClick={() => handleNewsClick(item.id)}>
            <NewsImage imageUrl={item.image} />
            <NewsContent>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDate>
                {moment(item.createDate).format('YYYY.MM.DD')}
              </NewsDate>
              <NewsDescription>{item.content}</NewsDescription>
              <NewsFooter>
                <NewsViews>
                  <Eye size={16} />
                  {item.view}
                </NewsViews>
              </NewsFooter>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
      {renderPagination()}
    </Container>
  );
};

export default News;
