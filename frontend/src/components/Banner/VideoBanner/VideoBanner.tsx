import React, { useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Container,
  SlideTrack,
  Controls,
  ControlButton,
  Slide,
  VideoWrapper,
  TitleWrapper,
  BannerTitle,
  BannerSubtitle,
} from './VideoBannerStyle';

interface VideoBannerProps {
  videos: Array<{
    url: string;
    title: string;
    subtitle?: string;
  }>;
}

const VideoBanner: React.FC<VideoBannerProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      setExitingIndex(currentIndex);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(newIndex);
        setExitingIndex(null);
      }, 600); // Half of the animation duration
    },
    [currentIndex],
  );

  const handlePrevSlide = useCallback(() => {
    if (exitingIndex !== null) return; // Prevent changing while animating
    const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    handleSlideChange(newIndex);
  }, [currentIndex, exitingIndex, videos.length, handleSlideChange]);

  const handleNextSlide = useCallback(() => {
    if (exitingIndex !== null) return; // Prevent changing while animating
    const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    handleSlideChange(newIndex);
  }, [currentIndex, exitingIndex, videos.length, handleSlideChange]);

  return (
    <Container>
      <SlideTrack>
        {videos.map((video, index) => (
          <Slide
            key={index}
            active={currentIndex === index}
            isExiting={exitingIndex === index}
          >
            <VideoWrapper>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ objectFit: 'cover' }}
              >
                <source src={video.url} type="video/mp4" />
              </video>
            </VideoWrapper>
            <TitleWrapper active={currentIndex === index}>
              <BannerTitle>{video.title}</BannerTitle>
              {video.subtitle && (
                <BannerSubtitle>{video.subtitle}</BannerSubtitle>
              )}
            </TitleWrapper>
          </Slide>
        ))}
      </SlideTrack>

      <Controls>
        <ControlButton onClick={handlePrevSlide}>
          <ChevronLeft size={24} />
        </ControlButton>
        <ControlButton onClick={handleNextSlide}>
          <ChevronRight size={24} />
        </ControlButton>
      </Controls>
    </Container>
  );
};

export default VideoBanner;
