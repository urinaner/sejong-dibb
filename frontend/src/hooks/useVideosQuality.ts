import { useState, useEffect } from 'react';
import { getOptimalVideoQuality } from '../utils/videos';

export const useVideoQuality = () => {
  const [quality, setQuality] = useState(getOptimalVideoQuality());

  useEffect(() => {
    const handleNetworkChange = () => {
      setQuality(getOptimalVideoQuality());
    };

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleNetworkChange);
      return () =>
        connection.removeEventListener('change', handleNetworkChange);
    }
  }, []);

  return quality;
};
