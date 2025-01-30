export const getOptimalVideoQuality = (): string => {
  if (typeof window === 'undefined') return '720p';

  const connection = (navigator as any).connection;
  if (connection) {
    const { downlink, effectiveType } = connection;
    if (downlink >= 5 && effectiveType === '4g') {
      return '1080p';
    }
  }

  return '720p';
};
