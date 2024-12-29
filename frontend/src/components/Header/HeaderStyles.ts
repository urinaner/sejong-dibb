import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const HeaderInner = styled.div`
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 64px; // 헤더 높이와 동일
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.98);
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 64px; // 헤더와 동일한 높이
  align-items: center; // 세로 중앙 정렬
  gap: 2rem;

  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
    height: auto;
    gap: 0;
    padding: 0;
    box-shadow: none;
  }
`;

export const MenuItem = styled.div`
  height: 100%; // 메뉴의 전체 높이를 사용
  display: flex;
  align-items: center; // 세로 중앙 정렬
  padding: 0 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;

  a {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    height: 48px; // 모바일에서는 더 작은 높이
    padding: 0 1rem;
    border-bottom: 1px solid #eaeaea;

    &:last-child {
      border-bottom: none;
    }
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  white-space: nowrap;
  height: 100%; // 링크도 전체 높이 사용
  display: flex;
  align-items: center;

  &:hover {
    color: #000;
  }
`;

// Nav 컴포넌트도 높이 조정
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  flex-grow: 1;
  justify-content: flex-end;
  max-width: 800px;
  height: 100%; // 전체 높이 사용

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0;
    gap: 0;
    border-bottom: 1px solid #eaeaea;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
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
  font-size: 0.9rem;
  color: #333;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #000;
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
    font-size: 1.1rem;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    padding: 0.8rem 1rem;

    svg {
      width: 32px;
    }

    span {
      font-size: 1rem;
    }
  }
`;

export const Item = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  white-space: nowrap;
  color: inherit;
  text-decoration: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
`;

export const ProfileItem = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;
