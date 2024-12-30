// src/hooks/useResponsive.ts
import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

export const useResponsive = () => {
  const [responsive, setResponsive] = useState<ResponsiveState>({
    isMobile: window.innerWidth < BREAKPOINTS.mobile,
    isTablet:
      window.innerWidth >= BREAKPOINTS.mobile &&
      window.innerWidth < BREAKPOINTS.desktop,
    isDesktop: window.innerWidth >= BREAKPOINTS.desktop,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setResponsive({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
        isDesktop: width >= BREAKPOINTS.desktop,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return responsive;
};
