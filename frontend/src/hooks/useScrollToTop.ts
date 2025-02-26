import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Scroll to top triggered for:', pathname);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
};
