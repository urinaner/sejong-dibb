import 'styled-components';
import { media } from './media';
import { typography } from './typography';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      headerGrey: string;
      headerHoverGrey: string;
      primary: {
        crimson: string;
        crimsonDark: string;
        crimsonLight: string;
      };
      grey: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
    };
    layout: {
      types: {
        default: {
          width: string;
          maxWidth: string;
          padding: string;
        };
        full: {
          width: string;
          maxWidth: string;
          padding: string;
        };
        auth: {
          width: string;
          maxWidth: string;
          padding: string;
        };
      };
      mobilePadding: string;
      tabletPadding: string;
      zIndexes: {
        base: number;
        overlay: number;
      };
    };
    media: typeof media;
    breakpoints: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
    };
    typography: typeof typography;
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    spacing: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    transitions: {
      fast: string;
      base: string;
    };
  }
}
