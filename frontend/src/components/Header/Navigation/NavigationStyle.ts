import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
  color: white;
  background-color: #a31432;
`;

export const MobileNavigationWrapper = styled.nav<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #a31432;
  padding: 1rem;
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
  background-color: #a31432;

  ${MobileNavButton} {
    padding: 0.5rem 1rem;
    font-size: 0.9em;
  }
`;
