import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 공통 미디어 쿼리 정의
const media = {
  desktop: '@media(min-width: 1024px)',
  tablet: '@media(max-width: 1024px)',
  mobile: '@media(max-width: 768px)',
};

// 공통 색상 상수
const colors = {
  primary: '#0056b3',
  secondary: '#6c757d',
  background: '#f8f9fa',
  border: '#eaeaea',
  text: {
    primary: '#333',
    dark: '#1a1a1a',
    light: '#666',
  },
  hover: {
    background: '#f1f1f1',
    primary: '#004494',
  },
};

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${colors.background};
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 2rem;

  ${media.mobile} {
    position: relative;
    height: auto;
    min-height: 64px;
    flex-direction: column;
    padding: 0;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.98);
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 64px;
  align-items: center;
  gap: 2rem;

  ${media.mobile} {
    position: static;
    flex-direction: column;
    height: auto;
    gap: 0;
    padding: 0;
    box-shadow: none;
  }
`;

export const MenuItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  a {
    height: 100%;
    display: flex;
    align-items: center;
  }

  ${media.mobile} {
    height: 48px;
    padding: 0 1rem;
    border-bottom: 1px solid ${colors.border};

    &:last-child {
      border-bottom: none;
    }
  }

  &:hover {
    background-color: ${colors.hover.background};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.text.primary};
  white-space: nowrap;
  height: 100%;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.text.dark};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  flex-grow: 1;
  justify-content: flex-end;
  max-width: 800px;
  height: 100%;

  ${media.mobile} {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0;
    gap: 0;
    border-bottom: 1px solid ${colors.border};
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 2rem;
  height: 100%;

  ${media.mobile} {
    margin-left: 1rem;
    height: auto;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${colors.text.primary};
  transition: color 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: ${colors.text.dark};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  padding: 0.8rem 2rem;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  svg {
    width: 36px;
    height: auto;
    margin-right: 12px;
    flex-shrink: 0;
  }

  span {
    font-size: 1.2rem;
    font-weight: 600;
    white-space: nowrap;
    letter-spacing: -0.5px;
  }

  ${media.mobile} {
    min-width: auto;
    width: 100%;
    border-bottom: 1px solid ${colors.border};
    padding: 0.8rem 1rem;

    svg {
      width: 32px;
    }

    span {
      font-size: 1.1rem;
    }
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
`;

export const ProfileItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.border};
  }

  &:hover {
    background-color: ${colors.hover.background};
  }
`;
