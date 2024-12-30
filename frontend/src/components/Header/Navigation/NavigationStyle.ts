import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: auto;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const MobileNavigationWrapper = styled.nav<{ isOpen: boolean }>`
  display: none;

  ${({ theme }) => theme.media.mobile} {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: ${({ theme }) => theme.headerHeight.mobile};
    left: 0;
    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.headerHeight.mobile});
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
  padding: 1rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export const MobileSubMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
`;
