import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import moment from 'moment';
import { apiEndpoints } from '../../../config/apiConfig';
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
  PageList,
  PageItem,
  PageButton,
  PaginationButton,
  LoadingSpinner,
  ErrorMessage,
  NoResults,
} from './NewsStyle';

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
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const pageSize = 10;

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError('');
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
      setError('뉴스를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
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
    const pages = [];
    const currentPageNum = currentPage + 1;

    // 첫 페이지와 이전 버튼
    pages.push(
      <PaginationButton
        key="first"
        direction="prev"
        onClick={() => handlePageChange(0)}
        disabled={currentPageNum === 1}
      >
        ⟪ 처음
      </PaginationButton>,
      <PaginationButton
        key="prev"
        direction="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPageNum === 1}
      >
        ⟨ 이전
      </PaginationButton>,
    );

    // 페이지 번호 렌더링
    const pageItems = [];
    if (totalPages <= 10) {
      // 10페이지 이하일 경우 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <PageItem key={i}>
            <PageButton
              onClick={() => handlePageChange(i - 1)}
              isActive={i === currentPageNum}
            >
              {i}
            </PageButton>
          </PageItem>,
        );
      }
    } else {
      // 10페이지 초과시 페이지 범위 계산하여 표시
      let startPage = Math.max(1, currentPageNum - 4);
      const endPage = Math.min(totalPages, startPage + 9);

      if (endPage - startPage < 9) {
        startPage = Math.max(1, endPage - 9);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageItems.push(
          <PageItem key={i}>
            <PageButton
              onClick={() => handlePageChange(i - 1)}
              isActive={i === currentPageNum}
            >
              {i}
            </PageButton>
          </PageItem>,
        );
      }
    }

    pages.push(<PageList key="pageList">{pageItems}</PageList>);

    // 다음과 마지막 페이지 버튼
    pages.push(
      <PaginationButton
        key="next"
        direction="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPageNum === totalPages}
      >
        다음 ⟩
      </PaginationButton>,
      <PaginationButton
        key="last"
        direction="next"
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={currentPageNum === totalPages}
      >
        마지막 ⟫
      </PaginationButton>,
    );

    return <Pagination>{pages}</Pagination>;
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner>로딩 중...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!news.length) {
    return (
      <Container>
        <NoResults>등록된 뉴스가 없습니다.</NoResults>
      </Container>
    );
  }

  return (
    <Container>
      <NewsGrid>
        {news.map((item) => (
          <NewsCard key={item.id} onClick={() => handleNewsClick(item.id)}>
            <NewsImage
              imageUrl={`https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/${item.image}`}
              onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
                e.currentTarget.classList.add('error');
              }}
            />
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
      {totalPages > 1 && renderPagination()}
    </Container>
  );
};

export default News;
