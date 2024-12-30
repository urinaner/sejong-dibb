import React from 'react';
import { ReactComponent as LogoIcon } from '../../../assets/images/sejong-icon.svg';
import { LogoContainer, LogoLink, LogoTitle } from './LogoStyle';
import { useResponsive } from '../../../hooks/useResponsive';

const Logo: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <LogoContainer>
      <LogoLink to="/">
        <LogoIcon width={isMobile ? '32px' : '36px'} height="auto" />
        <LogoTitle>세종대학교 바이오융합공학전공</LogoTitle>
      </LogoLink>
    </LogoContainer>
  );
};

export default Logo;
