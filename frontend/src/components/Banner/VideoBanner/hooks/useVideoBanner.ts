import { useState, useCallback, useEffect } from 'react';
import { Video } from '../types';

export const useVideoBanner = (videos: Video[], autoPlayInterval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = videos.length - 1;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isPaused && autoPlayInterval) {
      const interval = setInterval(handleNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [handleNext, isPaused, autoPlayInterval]);

  return {
    currentIndex,
    isPaused,
    setIsPaused,
    handleNext,
    handlePrev,
  };
};
