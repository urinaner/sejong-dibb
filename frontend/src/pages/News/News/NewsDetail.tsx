import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, ArrowLeft } from 'lucide-react';
import moment from 'moment';
import useNews, { useGetNewsById } from '../../../hooks/queries/useNews';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
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
  ErrorMessage,
} from './NewsDetailStyle';

const NewsDetail = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = 'https://ibb.sejong.ac.kr';

  const {
    data: newsItems,
    isLoading,
    isError,
    error,
  } = useGetNewsById(parseInt(newsId || '0'));

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner text="뉴스를 불러오는 중입니다..." />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorMessage>
          {error instanceof Error
            ? error.message
            : '뉴스를 불러오는데 실패했습니다.'}
        </ErrorMessage>
      </Container>
    );
  }

  if (!newsItems) {
    return (
      <Container>
        <ErrorMessage>뉴스를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <ArrowLeft size={20} />
        뒤로 가기
      </BackButton>
      <NewsWrapper>
        <NewsHeader>
          <NewsTitle>{newsItems.title}</NewsTitle>
          <NewsMetadata>
            <NewsDate>
              {moment(newsItems.createDate).format('YYYY.MM.DD')}
            </NewsDate>
            <NewsViews>
              <Eye size={16} />
              {newsItems.view}
            </NewsViews>
          </NewsMetadata>
        </NewsHeader>
        <NewsDivider />
        {newsItems.image && (
          <NewsImage src={`${newsItems.image}`} alt={newsItems.title} />
        )}
        <NewsContent>{newsItems.content}</NewsContent>
        {newsItems.link && (
          <NewsLink
            href={newsItems.link}
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
