import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
}

export const useScroll = () => {
  const [scroll, setScroll] = useState<ScrollState>({
    scrollY: window.scrollY,
    isScrollingUp: false,
    isScrollingDown: false,
  });

  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setScroll({
        scrollY: currentScrollY,
        isScrollingUp: !isScrollingDown,
        isScrollingDown,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
};
