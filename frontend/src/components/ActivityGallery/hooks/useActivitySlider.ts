import { useState, useCallback, useEffect } from 'react';
import { ActivityImage } from '../types/activity.types';

interface UseActivitySliderProps {
  images: ActivityImage[];
  autoPlayInterval?: number;
}

interface UseActivitySliderReturn {
  currentIndex: number;
  itemsPerView: number;
  selectedImage: ActivityImage | null;
  maxIndex: number;
  isPaused: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  setSelectedImage: (image: ActivityImage | null) => void;
  setIsPaused: (paused: boolean) => void;
  touchHandlers: {
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleTouchEnd: () => void;
  };
}

const useActivitySlider = ({
  images,
  autoPlayInterval = 5000,
}: UseActivitySliderProps): UseActivitySliderReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ActivityImage | null>(
    null,
  );
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 반응형 아이템 개수 계산
  const getItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }, []);

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // 윈도우 리사이즈 처리
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      // 현재 인덱스가 새로운 최대 인덱스를 넘지 않도록 조정
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, images.length - newItemsPerView)),
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images.length, getItemsPerView]);

  const maxIndex = Math.max(0, images.length - itemsPerView);

  // 네비게이션 핸들러
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // 자동 재생
  useEffect(() => {
    if (!isPaused && autoPlayInterval && images.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) {
            return 0;
          }
          return prev + 1;
        });
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [isPaused, autoPlayInterval, maxIndex, images.length, itemsPerView]);

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null); // 터치 시작 시 end 초기화
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // 최소 스와이프 거리

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0 && currentIndex < maxIndex) {
      handleNext();
    }

    if (distance < 0 && currentIndex > 0) {
      handlePrev();
    }

    // 터치 상태 초기화
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentIndex, maxIndex, handleNext, handlePrev]);

  return {
    currentIndex,
    itemsPerView,
    selectedImage,
    maxIndex,
    isPaused,
    handlePrev,
    handleNext,
    setSelectedImage,
    setIsPaused,
    touchHandlers: {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    },
  };
};

export default useActivitySlider;
