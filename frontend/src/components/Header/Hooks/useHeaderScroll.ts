import { useState, useEffect } from 'react';

interface HeaderScrollState {
  isScrolled: boolean;
  isVisible: boolean;
}

export const useHeaderScroll = (threshold = 50) => {
  const [state, setState] = useState<HeaderScrollState>({
    isScrolled: false,
    isVisible: true,
  });

  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setState({
        isScrolled: currentScrollY > threshold,
        isVisible: currentScrollY <= threshold || currentScrollY < lastScrollY,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return state;
};
