import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Page transition started for:', pathname);
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // 500ms로 늘림
    return () => clearTimeout(timer);
  }, [pathname]);

  return isTransitioning;
};
