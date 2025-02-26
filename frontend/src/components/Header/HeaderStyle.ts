import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TopHeaderContainer = styled.div`
  background-color: #8b0027;
  height: 45px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 51;
`;

export const TopHeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const TopHeaderTitle = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const TopNavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;

  @media (max-width: 768px) {
    gap: 1.5rem;

    /* LOGIN/LOGOUT 버튼 숨기기 */
    & > li:last-child {
      display: none;
    }
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const TopNavItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    height: 100%;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  &:last-child a {
    position: relative;
    padding: 0 1.5rem;

    &::before {
      content: '';
      position: absolute;
      left: -1rem;
      height: 1rem;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

// 메인 헤더 컨테이너 (이하 동일)
export const HeaderContainer = styled(motion.header)<{
  $isDropdownOpen: boolean;
}>`
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  height: 100px;
  background-color: #a30027;
  color: white;
  z-index: 50;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

export const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const HeaderNav = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: flex-end;
`;

export const PageWrapper = styled.div`
  padding-top: 145px;

  @media (max-width: 768px) {
    padding-top: 125px;
  }
`;
