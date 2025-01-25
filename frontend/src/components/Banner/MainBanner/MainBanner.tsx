import React, { useState } from 'react';
import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
import { MainBannerProps } from '../../../types/banner';
import { useVideoBanner } from '../VideoBanner/hooks/useVideoBanner';
import SlideControls from '../VideoBanner/SlideControls';
import { Video } from '../VideoBanner/types';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  background-color: #000;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

// const VideoContainer = styled(motion.div)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// const Content = styled(motion.div)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   text-align: right;
//   z-index: 2;
//   width: 90%;
//   max-width: 1200px;
//   padding-right: 5%;
// `;

// const TitleContainer = styled(motion.div)`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   max-width: 600px;
//   margin-left: auto;
// `;

// const TitleLine = styled(motion.div)`
//   overflow: hidden;
//   position: relative;
// `;

const Title = styled.h1`
  color: #ffffff;
  font-size: 4.8rem;
  font-weight: 800;
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
  autoPlayInterval = 10000,
  logo,
}) => {
  const videoArray: Video[] =
    videos.length > 0
      ? videos
      : videoSrc && title
        ? [{ id: '1', src: videoSrc, title: title.split('\n') }]
        : [];

  const { currentIndex, isPaused, setIsPaused, handleNext, handlePrev } =
    useVideoBanner(videoArray, autoPlayInterval);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (direction === 'prev') {
      handlePrev();
    } else {
      handleNext();
    }
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Animation variants
  const videoVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: 'easeIn',
      },
    },
  };

  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4, // 비디오 페이드인 후 시작
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const titleLineVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1], // custom easing
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  if (videoArray.length === 0) return null;

  return (
    <Container
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* <AnimatePresence mode="wait">
        <VideoContainer
          key={`video-${currentIndex}`}
          variants={videoVariants}
          initial="enter"
          animate="visible"
          exit="exit"
        >
          <VideoElement
            autoPlay
            loop
            muted
            playsInline
            src={videoArray[currentIndex].src}
          />
          <Content>
            <TitleContainer
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {videoArray[currentIndex].title.map((line, index) => (
                <TitleLine key={`title-${index}`} variants={titleLineVariants}>
                  <Title>{line}</Title>
                </TitleLine>
              ))}
            </TitleContainer>
          </Content>
        </VideoContainer>
      </AnimatePresence> */}

      {videoArray.length > 1 && (
        <SlideControls
          onPrev={() => handleSlideChange('prev')}
          onNext={() => handleSlideChange('next')}
        />
      )}
    </Container>
  );
};

export default MainBanner;
