import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MainBannerProps } from '../../../types/banner';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.65) 100%
    );
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) brightness(0.6);
`;

const Content = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  z-index: 2;
  width: 90%;
  max-width: 1200px;
  padding-left: 5%;
`;

const TitleContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
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

const MainBanner: React.FC<MainBannerProps> = ({ videoSrc }) => {
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

  return (
    <VideoContainer>
      <Video autoPlay loop muted playsInline src={videoSrc} />
      <Content variants={containerVariants} initial="hidden" animate="visible">
        <TitleContainer variants={itemVariants}>
          <Title>integrative</Title>
          <Title>bioscience and</Title>
          <Title>biotechnology</Title>
        </TitleContainer>
      </Content>
    </VideoContainer>
  );
};

export default MainBanner;
