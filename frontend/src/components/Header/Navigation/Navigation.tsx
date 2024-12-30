import React from 'react';
import { useResponsive } from '../../../hooks/useResponsive';

const Navigation: React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return <div>Navigation Component</div>;
};

export default Navigation;
