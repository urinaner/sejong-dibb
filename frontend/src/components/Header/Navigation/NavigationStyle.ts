import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-left: auto;
  margin-right: 2rem;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const MobileNavigationWrapper = styled.nav<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: ${({ theme }) => theme.layout.headerHeight.mobile};
    left: 0;
    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.layout.headerHeight.mobile});
    background-color: ${({ theme }) => theme.colors.primary.crimson};
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transitions.default};
    overflow-y: auto;
  }
`;

export const MobileNavItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.crimsonLight};
`;

export const MobileNavButton = styled.button`
  width: 100%;
  padding: 1.2rem 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;

export const MobileSubMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.primary.crimsonDark};

  ${MobileNavButton} {
    padding-left: 2.5rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;
