import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const NavItemWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const NavItemLink = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;

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
  min-width: 220px;
  background-color: ${({ theme }) => theme.colors.primary.crimson};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition: all ${({ theme }) => theme.transitions.default};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SubMenuItem = styled(Link)`
  display: block;
  padding: 0.8rem 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
  }
`;
