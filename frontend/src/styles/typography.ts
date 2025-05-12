export const typography = {
  fontFamily:
    "'NanumSquare', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
    extraBold: 800,
  },
  // 플랫폼별 폰트 최적화 헬퍼
  platformAdjust: {
    windows: {
      letterSpacing: '-0.02em',
      regularWeight: 500, // 윈도우에서는 regular를 좀 더 굵게
      boldWeight: 800, // 윈도우에서는 bold를 extraBold로
    },
  },
};
