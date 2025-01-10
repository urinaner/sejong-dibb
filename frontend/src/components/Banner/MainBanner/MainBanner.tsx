import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MainBannerProps } from '../../../types/banner';
import { useVideoBanner } from '../VideoBanner/hooks/useVideoBanner';
import SlideControls from '../VideoBanner/SlideControls';
import { Video } from '../VideoBanner/types';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
  background-color: #000;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const SlideTrack = styled.div<{ transform: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${(props) => props.transform};
  transition: transform 0.5s ease-in-out;
`;

const VideoContainer = styled.div`
  flex: 0 0 100%;
  position: relative;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: right;
  z-index: 2;
  width: 90%;
  max-width: 1200px;
  padding-right: 5%;
`;

const TitleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
  margin-left: auto;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 4.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: lowercase;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const MainBanner: React.FC<MainBannerProps> = ({
  videos = [],
  videoSrc,
  title,
  autoPlayInterval = 5000,
  logo,
}) => {
  const videoArray: Video[] =
    videos.length > 0
      ? videos
      : videoSrc && title
        ? [
            {
              id: '1',
              src: videoSrc,
              title: title.split('\n'),
            },
          ]
        : [];

  const { currentIndex, isPaused, setIsPaused, handleNext, handlePrev } =
    useVideoBanner(videoArray, autoPlayInterval);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  if (videoArray.length === 0) return null;

  return (
    <Container
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideTrack transform={`translateX(-${currentIndex * 100}%)`}>
        {videoArray.map((video) => (
          <VideoContainer key={video.id}>
            <VideoElement autoPlay loop muted playsInline src={video.src} />
            <Content
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <TitleContainer variants={itemVariants}>
                {video.title.map((line, index) => (
                  <Title key={index}>{line}</Title>
                ))}
              </TitleContainer>
            </Content>
          </VideoContainer>
        ))}
      </SlideTrack>
      {videoArray.length > 1 && (
        <SlideControls onPrev={handlePrev} onNext={handleNext} />
      )}
    </Container>
  );
};

export default MainBanner;
