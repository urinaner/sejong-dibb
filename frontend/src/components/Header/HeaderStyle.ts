import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled(motion.header)<{
  $isDropdownOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ $isDropdownOpen }) => ($isDropdownOpen ? 'auto' : '100px')};
  min-height: 100px;
  background-color: #a31432;
  color: white;
  z-index: 50;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 80px;
    min-height: 80px;
  }
`;

export const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 80px;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
  color: white;
  position: relative;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const MobileTitle = styled.h1`
  display: none;
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const HeaderNavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  color: white;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;
