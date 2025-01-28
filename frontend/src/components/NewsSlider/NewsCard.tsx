import React from 'react';
import moment from 'moment';
import { Eye } from 'lucide-react'; // 조회수 아이콘 추가
import {
  NewsCardWrapper,
  NewsImage,
  NewsContent,
  NewsTitle,
  NewsDate,
  NewsFooter,
  ViewCount,
} from './NewsSliderStyle';

interface NewsCardProps {
  id: number;
  title: string;
  createDate: string;
  image: string;
  view: number;
  imageBaseUrl: string;
  itemsPerView: number; // 추가
  onClick: (id: number) => void;
}

interface NewsCardProps {
  id: number;
  title: string;
  createDate: string;
  image: string;
  view: number; // 조회수 추가
  onClick: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  createDate,
  image,
  view,
  onClick,
  itemsPerView,
}) => {
  return (
    <NewsCardWrapper itemsPerView={itemsPerView} onClick={() => onClick?.(id)}>
      <NewsImage
        imageUrl={`${image}`}
        onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
          e.currentTarget.style.backgroundColor = '#f1f1f1';
          e.currentTarget.innerHTML = '이미지를 불러올 수 없습니다';
        }}
      />
      <NewsContent>
        <NewsTitle>{title}</NewsTitle>
        <NewsFooter>
          <NewsDate>{moment(createDate).format('YYYY.MM.DD')}</NewsDate>
          <ViewCount>
            <Eye size={16} />
            {view}
          </ViewCount>
        </NewsFooter>
      </NewsContent>
    </NewsCardWrapper>
  );
};

export default NewsCard;
