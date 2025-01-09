import React, { useState, useEffect, useCallback } from 'react';
import {
  SliderContainer,
  SliderTrack,
  PrevButton,
  NextButton,
} from './NewsSliderStyle';
import NewsCard from './NewsCard';
import SliderControls from './SliderControls';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 아이콘 import

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  createDate: string;
  image: string;
  category?: string;
}

interface NewsSliderProps {
  news: Array<{
    id: number;
    title: string;
    content: string;
    createDate: string;
    image: string;
    view: number;
    category?: string;
  }>;
  autoPlayInterval?: number;
  onNewsClick: (id: number) => void;
}

const NewsSlider: React.FC<NewsSliderProps> = ({
  news,
  autoPlayInterval = 5000,
  onNewsClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  };

  const IMAGE_BASE_URL =
    'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news';

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      const newMaxIndex = Math.max(0, news.length - newItemsPerView);
      setCurrentIndex((prev) => Math.min(prev, newMaxIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [news.length]);
  const maxIndex = Math.max(0, news.length - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isPaused && autoPlayInterval) {
      const interval = setInterval(() => {
        if (currentIndex >= maxIndex) {
          setCurrentIndex(0);
        } else {
          handleNext();
        }
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [currentIndex, maxIndex, handleNext, isPaused, autoPlayInterval]);

  return (
    <SliderContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SliderTrack
        transform={`translateX(-${currentIndex * (100 / itemsPerView)}%)`}
        gap={20}
      >
        {news.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            createDate={item.createDate}
            image={item.image}
            view={item.view || 0}
            imageBaseUrl={IMAGE_BASE_URL}
            itemsPerView={itemsPerView} // itemsPerView 전달
            onClick={onNewsClick}
          />
        ))}
      </SliderTrack>

      <PrevButton
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </PrevButton>

      <NextButton
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </NextButton>
    </SliderContainer>
  );
};

export default NewsSlider;
