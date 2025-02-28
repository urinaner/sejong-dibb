import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const NavItemWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const NavItemLink = styled(Link)<{ isActive?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 1.4rem; // TopNavItem과 동일한 간격을 위해 조정
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  background-color: transparent;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
    `}
`;

export const SubMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  background-color: #a31432;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-10px')});
  transition:
    opacity 0.3s,
    visibility 0.3s,
    transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

export const SubMenuItem = styled(Link)`
  display: block;
  padding: 0.8rem 1.5rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
