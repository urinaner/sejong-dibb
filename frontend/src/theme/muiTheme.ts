// src/theme/muiTheme.ts
import { createTheme } from '@mui/material/styles';
import styledTheme from './theme';
import { typography } from '../styles/typography';

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
    },
    h2: {
      fontSize: styledTheme.fontSizes['2xl'],
      fontWeight: typography.fontWeights.bold,
    },
    h3: {
      fontSize: styledTheme.fontSizes.xl,
      fontWeight: typography.fontWeights.bold,
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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: `${styledTheme.spacing.sm} ${styledTheme.spacing.base}`,
          transition: `all ${styledTheme.transitions.base}`,
          fontFamily: typography.fontFamily,
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
      },
    },
  },
});

export default muiTheme;
