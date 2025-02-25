// 브레이크포인트 크기 정의
const sizes = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
  largeDesktop: '1600px',
} as const;

// 미디어 쿼리 생성
export const media = {
  mobile: `@media (max-width: ${sizes.mobile})`,
  tablet: `@media (min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
  desktop: `@media (min-width: ${sizes.tablet}) and (max-width: ${sizes.desktop})`,
  largeDesktop: `@media (min-width: ${sizes.desktop})`,
  custom: (maxWidth: number) => `@media (max-width: ${maxWidth}px)`,

  // 특정 크기 이하일 때 적용
  belowMobile: `@media (max-width: ${sizes.mobile})`,
  belowTablet: `@media (max-width: ${sizes.tablet})`,
  belowDesktop: `@media (max-width: ${sizes.desktop})`,

  // 특정 크기 이상일 때 적용
  aboveMobile: `@media (min-width: ${sizes.mobile})`,
  aboveTablet: `@media (min-width: ${sizes.tablet})`,
  aboveDesktop: `@media (min-width: ${sizes.desktop})`,
} as const;

// useResponsive 훅에서 사용할 브레이크포인트 픽셀값
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1600,
} as const;
