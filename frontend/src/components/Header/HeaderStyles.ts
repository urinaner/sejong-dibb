import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.layout.headerHeight.desktop};
  background-color: ${({ theme }) => theme.colors.primary.crimson};
  color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.zIndex.header};
  transition: all ${({ theme }) => theme.transitions.default};

  ${({ theme }) => theme.media.mobile} {
    height: ${({ theme }) => theme.layout.headerHeight.mobile};
  }
`;
export const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 1rem;
  }
`;

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    gap: 0.5rem;
  }
`;
