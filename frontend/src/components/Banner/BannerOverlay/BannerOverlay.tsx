import React from 'react';
import styled from 'styled-components';

interface OverlayProps {
  opacity?: number;
}

const Overlay = styled.div<OverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, ${(props) => props.opacity || 0.5});
  z-index: 1;
`;

const BannerOverlay: React.FC<OverlayProps> = ({ opacity }) => {
  return <Overlay opacity={opacity} />;
};

export default BannerOverlay;
