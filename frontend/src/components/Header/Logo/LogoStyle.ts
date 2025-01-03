import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  min-width: 360px;

  @media (max-width: 768px) {
    min-width: auto;
    padding: 0.8rem 1rem;
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
`;

export const LogoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;

  svg {
    width: 52px;
    height: auto;

    @media (max-width: 768px) {
      width: 42px;
    }
  }
`;

export const LogoTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const Department = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: none;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;
