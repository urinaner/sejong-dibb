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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ModalContent = styled.div`
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #1a73e8;
  color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #1557b0;
  }
`;
