import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageBannerProps } from '../../../types/banner';

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  background-color: #000;
  margin-bottom: 2rem;

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
    height: 45vh;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) brightness(0.8);
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

const TextContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  padding: 2rem 0;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled(motion.p)`
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.5;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PageBanner: React.FC<PageBannerProps> = ({ content }) => {
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
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <BannerContainer>
      <Image src={content.image} alt={content.title} />
      <Content variants={containerVariants} initial="hidden" animate="visible">
        <TextContainer variants={itemVariants}>
          <Title>{content.title}</Title>
          <Description variants={itemVariants}>
            {content.description}
          </Description>
        </TextContainer>
      </Content>
    </BannerContainer>
  );
};

export default PageBanner;
