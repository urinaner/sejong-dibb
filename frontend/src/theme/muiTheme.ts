// src/theme/muiTheme.ts
import { createTheme } from '@mui/material/styles';
import styledTheme from './theme';
import { typography } from '../styles/typography';

// 플랫폼 감지 함수 (실제 사용시에는 클라이언트 사이드에서만 실행되어야 함)
const isWindowsPlatform =
  typeof navigator !== 'undefined' && navigator.platform.indexOf('Win') > -1;

// MUI 테마 생성
const muiTheme = createTheme({
  palette: {
    primary: {
      main: styledTheme.colors.primary.crimson,
      dark: styledTheme.colors.primary.crimsonDark,
      light: styledTheme.colors.primary.crimsonLight,
    },
    secondary: {
      main: styledTheme.colors.grey[400],
    },
    background: {
      default: styledTheme.colors.white,
      paper: styledTheme.colors.white,
    },
    grey: {
      50: styledTheme.colors.grey[50],
      100: styledTheme.colors.grey[100],
      200: styledTheme.colors.grey[200],
      300: styledTheme.colors.grey[300],
      400: styledTheme.colors.grey[400],
      500: styledTheme.colors.grey[500],
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
    fontSize: 14,
    h1: {
      fontSize: styledTheme.fontSizes['3xl'],
      fontWeight: typography.fontWeights.bold,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: styledTheme.fontSizes['2xl'],
      fontWeight: typography.fontWeights.bold,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: styledTheme.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: styledTheme.fontSizes.base,
      fontFamily: typography.fontFamily,
    },
    body2: {
      fontSize: styledTheme.fontSizes.sm,
      fontFamily: typography.fontFamily,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: parseInt(styledTheme.breakpoints.mobile),
      md: parseInt(styledTheme.breakpoints.tablet),
      lg: parseInt(styledTheme.breakpoints.laptop),
      xl: parseInt(styledTheme.breakpoints.desktop),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
    @font-face {
      font-family: 'NanumSquare';
      font-style: normal;
      font-weight: 400;
      src: local('NanumSquare Regular'), 
           url('/fonts/NanumSquareR.otf') format('opentype'),
           url('/fonts/NanumSquareR.ttf') format('truetype');
      font-display: block;
    }
    
    @font-face {
      font-family: 'NanumSquare';
      font-style: normal;
      font-weight: 700;
      src: local('NanumSquare Bold'), 
           url('/fonts/NanumSquareB.otf') format('opentype'),
           url('/fonts/NanumSquareB.ttf') format('truetype');
      font-display: block;
    }
    
    @font-face {
      font-family: 'NanumSquare';
      font-style: normal;
      font-weight: 800;
      src: local('NanumSquare ExtraBold'), 
           url('/fonts/NanumSquareEB.otf') format('opentype'),
           url('/fonts/NanumSquareEB.ttf') format('truetype');
      font-display: block;
    }
    
    @font-face {
      font-family: 'NanumSquare';
      font-style: normal;
      font-weight: 300;
      src: local('NanumSquare Light'), 
           url('/fonts/NanumSquareL.otf') format('opentype'),
           url('/fonts/NanumSquareL.ttf') format('truetype');
      font-display: block;
    }
    
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    
    /* Windows 환경 폰트 최적화 */
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none), (min--moz-device-pixel-ratio:0) {
      body, button, input, select, textarea {
        letter-spacing: -0.02em;
      }
      
      h1, h2, h3, h4, h5, h6, strong, b {
        font-weight: 800 !important;
      }
    }
  `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: `${styledTheme.spacing.sm} ${styledTheme.spacing.base}`,
          transition: `all ${styledTheme.transitions.base}`,
          fontFamily: typography.fontFamily,
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            fontFamily: typography.fontFamily,
          },
          '& .MuiInputLabel-root': {
            fontFamily: typography.fontFamily,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily,
        },
        h1: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h2: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h3: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h4: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h5: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h6: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          '&.Mui-selected': {
            fontWeight: 800,
          },
        },
      },
    },
  },
});

export default muiTheme;
