import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary.crimson};
`;

export const NavigationRightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: ${({ theme }) => theme.spacing.base};
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary.crimson};
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 1rem;
    width: calc(100% - 2rem);
    justify-content: center;
  }
`;

export const MobileNavigationWrapper = styled.nav<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary.crimson};
  padding: 1rem 0;
  z-index: 50;
`;

export const MobileNavItem = styled.div`
  width: 100%;
  color: white;
`;

export const MobileNavButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const MobileSubMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding-left: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.crimsonDark};

  ${MobileNavButton} {
    padding: 0.5rem 1rem;
    font-size: 0.9em;
  }
`;
