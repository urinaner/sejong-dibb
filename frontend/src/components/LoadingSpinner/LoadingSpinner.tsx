import React from 'react';
import { PulseLoader } from 'react-spinners';
import styled from 'styled-components';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  loading?: boolean;
  fullscreen?: boolean;
  text?: string;
}

const SpinnerWrapper = styled.div<{ $fullscreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  ${({ $fullscreen }) =>
    $fullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  `}
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 15,
  color = '#1a73e8',
  loading = true,
  fullscreen = false,
  text,
}) => {
  if (!loading) return null;

  return (
    <SpinnerWrapper $fullscreen={fullscreen}>
      <PulseLoader
        color={color}
        size={size}
        speedMultiplier={0.8}
        loading={loading}
      />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
