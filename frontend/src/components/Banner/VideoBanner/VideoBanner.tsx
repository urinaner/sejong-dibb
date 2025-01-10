import React from 'react';
import { Container, SlideTrack } from './VideoBannerStyle';
import { VideoBannerProps } from './types';
import { useVideoBanner } from './hooks/useVideoBanner';
import VideoSlide from './VideoSlide';
import SlideControls from './SlideControls';

const VideoBanner: React.FC<VideoBannerProps> = ({
  videos,
  autoPlayInterval,
}) => {
  const { currentIndex, isPaused, setIsPaused, handleNext, handlePrev } =
    useVideoBanner(videos, autoPlayInterval);

  return (
    <Container
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideTrack transform={`translateX(-${currentIndex * 100}%)`}>
        {videos.map((video) => (
          <VideoSlide key={video.id} src={video.src} title={video.title} />
        ))}
      </SlideTrack>
      <SlideControls onPrev={handlePrev} onNext={handleNext} />
    </Container>
  );
};

export default VideoBanner;
