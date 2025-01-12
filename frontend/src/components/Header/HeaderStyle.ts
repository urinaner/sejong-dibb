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
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

export const TopNavList = styled.ul`
  display: flex;
  gap: 2.25rem;
  margin: 0;
  padding-right: 1.125rem;
  list-style: none;
  justify-content: flex-end;
`;

export const TopNavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// 메인 헤더 컨테이너
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
  padding: 0 2rem;
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

// 기본 페이지 컨텐츠를 위한 래퍼 컴포넌트 추가
export const PageWrapper = styled.div`
  padding-top: 145px; // TopHeader(45px) + Header(100px) 높이의 합

  @media (max-width: 768px) {
    padding-top: 125px; // TopHeader(45px) + Header(80px)
  }
`;
