// src/styles/media.ts
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1600,
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.tablet + 1}px) and (max-width: ${breakpoints.desktop}px)`,
  largeDesktop: `@media (min-width: ${breakpoints.desktop + 1}px)`,

  belowTablet: `@media (max-width: ${breakpoints.tablet}px)`,
  belowDesktop: `@media (max-width: ${breakpoints.desktop}px)`,

  aboveMobile: `@media (min-width: ${breakpoints.mobile + 1}px)`,
  aboveTablet: `@media (min-width: ${breakpoints.tablet + 1}px)`,
};
