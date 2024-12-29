import React from 'react';
import styled from 'styled-components';
import { MainBannerProps } from '../../../types/banner';
import BannerOverlay from '../BannerOverlay/BannerOverlay';
import { SEJONG_COLORS } from '../../../constants/colors';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 90%;
  color: white;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    width: 100px;
  }
`;

const MainBanner: React.FC<MainBannerProps> = ({ videoSrc, logo, title }) => {
  return (
    <VideoContainer>
      <Video
        autoPlay
        loop
        muted
        playsInline
        src={videoSrc}
      />
      <BannerOverlay opacity={0.4} />
      <Content>
        {logo && <Logo src={logo} alt="Sejong University" />}
        <Title>{title}</Title>
      </Content>
    </VideoContainer>
  );
};

export default MainBanner;
