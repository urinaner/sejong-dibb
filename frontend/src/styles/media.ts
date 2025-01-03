// Breakpoint sizes
const sizes = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
} as const;

// Media queries
export const media = {
  mobile: `@media (max-width: ${sizes.mobile})`,
  tablet: `@media (min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
  desktop: `@media (min-width: ${sizes.tablet})`,
  custom: (maxWidth: number) => `@media (max-width: ${maxWidth}px)`,
} as const;

// Breakpoints for useResponsive hook
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;
