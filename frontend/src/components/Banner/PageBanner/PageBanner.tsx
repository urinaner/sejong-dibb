import React from 'react';
import styled from 'styled-components';
import { PageBannerProps } from '../../../types/banner';
import BannerOverlay from '../BannerOverlay/BannerOverlay';
import { SEJONG_COLORS } from '../../../constants/colors';

const BannerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40vh;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 30vh;
    }
`;

const Image = styled.img`
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
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Description = styled.p`
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const PageBanner: React.FC<PageBannerProps> = ({ content }) => {
  return (
    <BannerContainer>
      <Image src={content.image} alt={content.title} />
      <BannerOverlay opacity={0.6} />
      <Content>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
      </Content>
    </BannerContainer>
  );
};

export default PageBanner;
