// theme.ts
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
};

export const theme = {
  colors: {
    white: '#FFFFFF',
    primary: {
      crimson: '#a31432',
      crimsonDark: '#8a1029',
      crimsonLight: '#c41a3e',
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#D5D6D2',
      300: '#B7B1A9',
      400: '#837259',
      500: '#51626F',
    },
  },
  breakpoints,
  media: {
    mobile: `@media (max-width: ${breakpoints.mobile})`,
    tablet: `@media (max-width: ${breakpoints.tablet})`,
    laptop: `@media (max-width: ${breakpoints.laptop})`,
    desktop: `@media (max-width: ${breakpoints.desktop})`,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
  },
  transitions: {
    fast: '0.2s',
    base: '0.3s',
  },
} as const;

export type Theme = typeof theme;
export default theme;
