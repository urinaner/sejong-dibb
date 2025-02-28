import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0;
  min-width: 360px;

  @media (max-width: 768px) {
    min-width: auto;
    padding: 0;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  position: relative;
`;

export const LogoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;

  svg {
    width: 72px;
    height: auto;

    @media (max-width: 768px) {
      width: 57px;
    }
  }
`;

export const LogoTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  opacity: 0.95;
`;

export const Department = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: none;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export const MobileLogoTitle = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 1;

  @media (min-width: 769px) {
    display: none;
  }
`;
