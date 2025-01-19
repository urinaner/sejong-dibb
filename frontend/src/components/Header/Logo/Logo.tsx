import React from 'react';
import { ReactComponent as LogoIcon } from '../../../assets/images/sejong-icon-w.svg';
import {
  LogoContainer,
  LogoLink,
  LogoImage,
  LogoTitle,
  LogoWrapper,
  Department,
  MobileLogoTitle,
} from './LogoStyle';

interface LogoProps {
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ compact = false }) => {
  return (
    <LogoContainer>
      <LogoLink to="/" aria-label="홈으로 가기">
        <LogoWrapper>
          <LogoImage>
            <LogoIcon style={{ fill: 'white' }} />
          </LogoImage>
          {!compact && (
            <LogoTitle>
              세종대학교
              <Department>바이오융합공학전공</Department>
            </LogoTitle>
          )}
          {compact && (
            <MobileLogoTitle>세종대학교 바이오융합공학전공</MobileLogoTitle>
          )}
        </LogoWrapper>
      </LogoLink>
    </LogoContainer>
  );
};

export default Logo;
