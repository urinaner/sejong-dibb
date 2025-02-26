// src/styles/Container.tsx
import React from 'react';
import styled from 'styled-components';
import { media } from './media';

type ContainerType = 'default' | 'full' | 'content';

interface ContainerProps {
  children: React.ReactNode;
  type?: ContainerType;
  className?: string;
}

const StyledContainer = styled.div<{ $type: ContainerType }>`
  width: ${({ $type }) => {
    switch ($type) {
      case 'full':
        return '100%';
      case 'content':
        return 'calc(100% - 0px)'; // 모바일에서는 패딩만 적용
      default:
        return '100%';
    }
  }};

  max-width: ${({ $type }) => {
    switch ($type) {
      case 'full':
        return '100%';
      case 'content':
        return '1300px';
      default:
        return '1300px';
    }
  }};

  margin: 0 auto;
  padding: ${({ $type }) => {
    switch ($type) {
      case 'full':
        return '0';
      case 'content':
        return '0 5px';
      default:
        return '0 5px';
    }
  }};

  ${media.mobile} {
    width: 100%; // 모바일에서는 너비를 꽉 채우고
    padding: ${({ $type }) => {
      switch ($type) {
        case 'full':
          return '0';
        default:
          return '25px 0px'; // 패딩으로 여백 처리
      }
    }};
  }
`;

const Container: React.FC<ContainerProps> = ({
  children,
  type = 'default',
  className,
}) => {
  return (
    <StyledContainer $type={type} className={className}>
      {children}
    </StyledContainer>
  );
};

export default Container;
