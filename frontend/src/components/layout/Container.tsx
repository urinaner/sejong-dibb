import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media'; // 미디어 쿼리 유틸리티 가져오기

// 컨테이너 타입 정의
type ContainerType = 'default' | 'full' | 'narrow' | 'wide';

// 컨테이너 컴포넌트 속성 정의
interface ContainerProps {
  children: React.ReactNode;
  type?: ContainerType;
  className?: string;
  preservePadding?: boolean;
  noPadding?: boolean;
  noMargin?: boolean;
  maxWidth?: string;
  as?: React.ElementType;
}

// 스타일링된 컨테이너 컴포넌트
const StyledContainer = styled.div<{
  $type: ContainerType;
  $preservePadding?: boolean;
  $noPadding?: boolean;
  $noMargin?: boolean;
  $maxWidth?: string;
}>`
  // 컨테이너 타입에 따른 너비 설정
  width: ${({ theme, $type }) => {
    switch ($type) {
      case 'narrow':
        return '70vw';
      case 'wide':
        return '95vw';
      case 'full':
        return '100%';
      default:
        return theme.layout.types.default.width || '85vw';
    }
  }};

  // 컨테이너 타입에 따른 최대 너비 설정
  max-width: ${({ theme, $type, $maxWidth }) => {
    if ($maxWidth) return $maxWidth;

    switch ($type) {
      case 'narrow':
        return '1200px';
      case 'wide':
        return '1800px';
      case 'full':
        return '100%';
      default:
        return theme.layout.types.default.maxWidth || '1600px';
    }
  }};

  // 여백 및 패딩 설정
  margin: ${({ $noMargin }) => ($noMargin ? '0' : '0 auto')};
  padding: ${({ theme, $type, $preservePadding, $noPadding }) =>
    $noPadding
      ? '0'
      : $preservePadding
        ? 'inherit'
        : $type === 'full'
          ? '0'
          : theme.layout.types.default.padding || '40px 20px'};

  // 반응형 스타일 적용
  ${media.mobile} {
    width: 100%;
    padding: ${({ $preservePadding, $noPadding, theme }) =>
      $noPadding
        ? '0'
        : $preservePadding
          ? 'inherit'
          : theme.layout.mobilePadding || '20px 16px'};
  }

  ${media.tablet} {
    width: ${({ $type }) => ($type === 'full' ? '100%' : '90%')};
    padding: ${({ $preservePadding, $noPadding, theme }) =>
      $noPadding
        ? '0'
        : $preservePadding
          ? 'inherit'
          : theme.layout.tabletPadding || '30px 20px'};
  }
`;

// Container 컴포넌트 정의
export const Container: React.FC<ContainerProps> = ({
  children,
  type = 'default',
  className,
  preservePadding = false,
  noPadding = false,
  noMargin = false,
  maxWidth,
  as,
}) => {
  return (
    <StyledContainer
      $type={type}
      className={className}
      $preservePadding={preservePadding}
      $noPadding={noPadding}
      $noMargin={noMargin}
      $maxWidth={maxWidth}
      as={as}
    >
      {children}
    </StyledContainer>
  );
};

// 기본 내보내기
export default Container;
