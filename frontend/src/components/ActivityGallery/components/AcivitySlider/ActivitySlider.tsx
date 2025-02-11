import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ActivityImage } from '../../types/activity.types';
import { loadActivityImages } from '../../utils/imageLoader';
import ActivityCard from '../ActivityCard/ActivityCard';
import ActivityModal from '../ActivityModal/AcivityModal';
import SliderControls from './SliderControls';

const SliderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px; // 모바일에서 패딩 줄임
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 0;
`;

const CARD_GAP = 20;

const SliderTrack = styled.div<{ transform: string }>`
  display: flex;
  gap: ${CARD_GAP}px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
  width: 100%;
  will-change: transform; // 성능 최적화
`;

const ActivitySlider = ({ autoPlayInterval = 5000 }) => {
  const [images, setImages] = useState<ActivityImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ActivityImage | null>(
    null,
  );
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const loadedImages = loadActivityImages();
      setImages(loadedImages);
    } catch (error) {
      console.error('Failed to load activity images:', error);
    }
  }, []);

  const getItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    return 3;
  }, []);

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // 컨테이너 너비 업데이트 함수 개선
  const updateContainerWidth = useCallback(() => {
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      const paddingLeft = parseInt(computedStyle.paddingLeft, 10);
      const paddingRight = parseInt(computedStyle.paddingRight, 10);
      const width =
        containerRef.current.clientWidth - (paddingLeft + paddingRight);
      setContainerWidth(width);
    }
  }, []);

  // 카드 너비 계산 함수 개선
  const calculateCardWidth = useCallback(() => {
    if (containerWidth <= 0) return 0;
    const totalGap = (itemsPerView - 1) * CARD_GAP;
    const width = Math.floor((containerWidth - totalGap) / itemsPerView);
    return width;
  }, [containerWidth, itemsPerView]);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      updateContainerWidth();

      // 현재 인덱스 재조정
      requestAnimationFrame(() => {
        setCurrentIndex((prev) =>
          Math.min(prev, Math.max(0, images.length - newItemsPerView)),
        );
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images.length, getItemsPerView, updateContainerWidth]);

  const maxIndex = Math.max(0, images.length - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // 터치 이벤트 처리 개선
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null); // 터치 시작시 end 초기화
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const cardWidth = calculateCardWidth() + CARD_GAP;
    const threshold = cardWidth * 0.2;

    if (Math.abs(distance) < threshold) {
      // 원위치로 돌아가기
      if (trackRef.current) {
        const currentOffset = currentIndex * (calculateCardWidth() + CARD_GAP);
        trackRef.current.style.transform = `translateX(-${currentOffset}px)`;
      }
      return;
    }

    if (distance > 0 && currentIndex < maxIndex) {
      handleNext();
    }

    if (distance < 0 && currentIndex > 0) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused && autoPlayInterval && images.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, autoPlayInterval, maxIndex, images.length, itemsPerView]);

  if (images.length === 0) return null;

  const cardWidth = calculateCardWidth();
  const slideOffset = Math.round(currentIndex * (cardWidth + CARD_GAP));

  return (
    <SliderContainer
      ref={containerRef}
      className="slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SliderWrapper
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SliderTrack ref={trackRef} transform={`translateX(-${slideOffset}px)`}>
          {images.map((image) => (
            <ActivityCard
              key={image.id}
              image={image}
              itemsPerView={itemsPerView}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </SliderTrack>
      </SliderWrapper>

      <SliderControls
        onPrevClick={handlePrev}
        onNextClick={handleNext}
        isPrevDisabled={currentIndex === 0}
        isNextDisabled={currentIndex >= maxIndex}
      />

      {selectedImage && (
        <ActivityModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </SliderContainer>
  );
};

export default ActivitySlider;
