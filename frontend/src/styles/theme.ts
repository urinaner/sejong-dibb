// src/styles/theme.ts
import { SEJONG_COLORS } from '../constants/colors';

const theme = {
  colors: {
    primary: {
      crimson: SEJONG_COLORS.CRIMSON_RED,
      crimsonDark: '#A30027',
      crimsonLight: '#D4193F',
    },
    grey: {
      50: '#F8F9FA',
      100: '#EAEAEA',
      200: SEJONG_COLORS.COOL_GRAY,
      300: SEJONG_COLORS.WARM_GRAY1,
      400: SEJONG_COLORS.WARM_GRAY2,
      500: SEJONG_COLORS.GRAY,
    },
    white: '#FFFFFF',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
  media: {
    mobile: '@media (max-width: 768px)',
    tablet: '@media (min-width: 769px) and (max-width: 1024px)',
    desktop: '@media (min-width: 1025px)',
  },
  layout: {
    maxWidth: '1280px',
    headerHeight: {
      desktop: '80px',
      mobile: '64px',
    },
  },
  zIndex: {
    header: 1000,
    dropdown: 1001,
    modal: 1002,
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.45s ease-in-out',
  },
};

export type Theme = typeof theme;
export default theme;
