import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const NavItemWrapper = styled.div`
  position: relative;
`;

export const NavItemLink = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.95rem;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
    `}
`;

export const SubMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.primary.crimson};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all ${({ theme }) => theme.transitions.default};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SubMenuItem = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
  }
`;
