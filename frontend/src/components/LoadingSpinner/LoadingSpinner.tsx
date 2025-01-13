import React from 'react';
import { PulseLoader } from 'react-spinners';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  loading?: boolean;
  fullscreen?: boolean;
  text?: string;
  blur?: boolean;
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const SpinnerWrapper = styled.div<{ $fullscreen?: boolean; $blur?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: ${({ $fullscreen }) => ($fullscreen ? '100vh' : '200px')};
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;

  ${({ $fullscreen, $blur }) =>
    $fullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${$blur ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.98)'};
    backdrop-filter: ${$blur ? 'blur(8px)' : 'none'};
    z-index: 9999;
  `}
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.4s ease-out;
`;

const LoadingText = styled.p`
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.5;
  animation: ${fadeIn} 0.4s ease-out 0.2s both;
`;

const SubText = styled.span`
  display: block;
  color: #718096;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  animation: ${fadeIn} 0.4s ease-out 0.3s both;
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 15,
  color = '#4299E1',
  loading = true,
  fullscreen = false,
  text,
  blur = true,
}) => {
  if (!loading) return null;

  const mainText = text || '로딩 중입니다';
  const subText = '잠시만 기다려주세요';

  return (
    <SpinnerWrapper $fullscreen={fullscreen} $blur={blur}>
      <LoadingContainer>
        <PulseLoader
          color={color}
          size={size}
          speedMultiplier={0.8}
          loading={loading}
          margin={8}
        />
        <LoadingText>
          {mainText}
          <SubText>{subText}</SubText>
        </LoadingText>
      </LoadingContainer>
    </SpinnerWrapper>
  );
};

// 사용 예시를 위한 상수 export
export const SPINNER_VARIANTS = {
  PRIMARY: '#4299E1', // 기본 파란색
  SUCCESS: '#48BB78', // 성공 초록색
  WARNING: '#ECC94B', // 경고 노란색
  DANGER: '#F56565', // 위험 빨간색
  PURPLE: '#9F7AEA', // 보조 보라색
  ORANGE: '#ED8936', // 보조 주황색
} as const;

export default LoadingSpinner;
