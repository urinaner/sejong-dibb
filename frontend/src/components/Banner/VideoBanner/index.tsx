import React, { useEffect, useRef, useState } from 'react';
import { Video, VideoSource } from './types';
import { getOptimalVideoQuality } from '../../../utils/videos';

interface VideoBannerProps {
  video: Video;
  onError?: (error: Error) => void;
}

const VideoBanner: React.FC<VideoBannerProps> = ({ video, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentQuality, setCurrentQuality] = useState<string>('720p');

  useEffect(() => {
    const optimalQuality = getOptimalVideoQuality();
    setCurrentQuality(optimalQuality);

    const handleNetworkChange = () => {
      const newOptimalQuality = getOptimalVideoQuality();
      if (newOptimalQuality !== currentQuality) {
        setCurrentQuality(newOptimalQuality);
      }
    };

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleNetworkChange);
      return () =>
        connection.removeEventListener('change', handleNetworkChange);
    }
  }, [currentQuality]);

  const handleError = (e: Event) => {
    const target = e.target as HTMLVideoElement;
    if (currentQuality === '1080p') {
      setCurrentQuality('720p');
    }
    if (onError) {
      onError(new Error(`Video playback error: ${target.error?.message}`));
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={video.poster}
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
      >
        {video.sources
          .filter(
            (source) =>
              !source.media || window.matchMedia(source.media).matches,
          )
          .map((source: VideoSource, index: number) => (
            <source
              key={`${source.quality}-${index}`}
              src={source.src}
              type={source.type}
              data-quality={source.quality}
            />
          ))}
      </video>
    </div>
  );
};

export default VideoBanner;
