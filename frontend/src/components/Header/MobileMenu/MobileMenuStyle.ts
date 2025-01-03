import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const MobileMenuButton = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2px;
  }
`;
export const MobileMenuWrapper = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #a31432;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: transform 0.3s;
    overflow-y: auto;
    z-index: 100;
  }
`;

export const MobileMenuItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

interface MenuTitleProps {
  isOpen: boolean;
}

export const MobileMenuTitle = styled.button<MenuTitleProps>`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0')});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
`;

export const MobileSubMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
`;

export const MobileSubMenuItem = styled(Link)`
  display: block;
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  opacity: 0.9;
  text-decoration: none;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
  }
`;
