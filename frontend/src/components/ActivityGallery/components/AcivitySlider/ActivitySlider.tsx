import React, { useState, useCallback, useEffect } from 'react';
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
    padding: 0 30px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 0;
`;

const SliderTrack = styled.div<{ transform: string }>`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => props.transform};
`;

interface ActivitySliderProps {
  autoPlayInterval?: number;
  customImages?: ActivityImage[];
}

const ActivitySlider: React.FC<ActivitySliderProps> = ({
  autoPlayInterval = 5000,
  customImages,
}) => {
  const [images, setImages] = useState<ActivityImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ActivityImage | null>(
    null,
  );
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (customImages) {
      setImages(customImages);
    } else {
      try {
        const loadedImages = loadActivityImages();
        setImages(loadedImages);
      } catch (error) {
        console.error('Failed to load activity images:', error);
      }
    }
  }, [customImages]);

  const getItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }, []);

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, images.length - newItemsPerView)),
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images.length, getItemsPerView]);

  const maxIndex = Math.max(0, images.length - itemsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Auto play
  useEffect(() => {
    if (!isPaused && autoPlayInterval && images.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [isPaused, autoPlayInterval, maxIndex, images.length, itemsPerView]);

  // 터치 이벤트 처리
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }

    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (images.length === 0) return null;

  return (
    <SliderContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SliderWrapper
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SliderTrack
          transform={`translateX(-${currentIndex * (100 / itemsPerView)}%)`}
        >
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
