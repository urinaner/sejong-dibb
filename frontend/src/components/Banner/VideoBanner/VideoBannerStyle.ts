import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(1.02);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.98);
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
  background-color: #000;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const SlideTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = styled.div<{ active: boolean; isExiting: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: ${(props) =>
    props.active || props.isExiting ? 'visible' : 'hidden'};
  animation: ${(props) => {
    if (props.active)
      return css`
        ${fadeIn} 1.2s ease-out forwards
      `;
    if (props.isExiting)
      return css`
        ${fadeOut} 1.2s ease-out forwards
      `;
    return 'none';
  }};
  z-index: ${(props) => (props.active ? 2 : props.isExiting ? 1 : 0)};
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TitleWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  bottom: 20%;
  left: 10%;
  z-index: 2;
  color: white;
  opacity: 0;
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  animation: ${(props) =>
    props.active
      ? css`
          ${slideUp} 0.8s ease-out 0.4s forwards
        `
      : 'none'};
`;

export const BannerTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const BannerSubtitle = styled.p`
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Controls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;

export const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
