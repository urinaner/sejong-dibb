import React from 'react';
import styled from 'styled-components';

const SlideContainer = styled.div`
  flex: 0 0 100%;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  text-align: right;
  color: white;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

interface VideoSlideProps {
  src: string;
  title: string[];
}

const VideoSlide: React.FC<VideoSlideProps> = ({ src, title }) => (
  <SlideContainer>
    <Video autoPlay loop muted playsInline src={src} />
    <TitleContainer>
      {title.map((line, index) => (
        <Title key={index}>{line}</Title>
      ))}
    </TitleContainer>
  </SlideContainer>
);

export default VideoSlide;
