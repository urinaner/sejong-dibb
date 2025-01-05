// NewsDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, ArrowLeft } from 'lucide-react';
import moment from 'moment';
import { apiEndpoints } from '../../../config/apiConfig';
import {
  Container,
  BackButton,
  NewsWrapper,
  NewsHeader,
  NewsTitle,
  NewsMetadata,
  NewsDate,
  NewsViews,
  NewsDivider,
  NewsImage,
  NewsContent,
  NewsLink,
  LoadingSpinner,
  ErrorMessage,
} from './NewsDetailStyle';

interface NewsDetailData {
  id: number;
  title: string;
  content: string;
  view: number;
  createDate: string;
  link: string;
  image: string;
}

const NewsDetail = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setIsLoading(true);
        if (!newsId) return;

        const response = await fetch(apiEndpoints.news.get(parseInt(newsId)));

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('뉴스를 찾을 수 없습니다.');
          }
          throw new Error('뉴스를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId]);

  const handleBack = () => {
    navigate(-1);
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

  if (!newsData) {
    return null;
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <ArrowLeft size={20} />
        뒤로 가기
      </BackButton>
      <NewsWrapper>
        <NewsHeader>
          <NewsTitle>{newsData.title}</NewsTitle>
          <NewsMetadata>
            <NewsDate>
              {moment(newsData.createDate).format('YYYY.MM.DD')}
            </NewsDate>
            <NewsViews>
              <Eye size={16} />
              {newsData.view}
            </NewsViews>
          </NewsMetadata>
        </NewsHeader>
        <NewsDivider />
        {newsData.image && (
          <NewsImage
            src={`https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/${newsData.image}`}
            alt={newsData.title}
          />
        )}
        <NewsContent>{newsData.content}</NewsContent>
        {newsData.link && (
          <NewsLink
            href={newsData.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            원문 보기
          </NewsLink>
        )}
      </NewsWrapper>
    </Container>
  );
};

export default NewsDetail;
