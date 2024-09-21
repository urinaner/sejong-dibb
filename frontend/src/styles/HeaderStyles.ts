// src/styles/HeaderStyles.ts
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: relative; // 위치 기준 설정
  width: 100%;
  min-width: 100vw; // 최소 너비를 뷰포트 너비로 설정
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 3rem;
  padding-bottom: -10;
  box-sizing: border-box; // 패딩과 보더가 너비에 포함되도록 설정
  margin: 0;
`;

export const Logo = styled.div`
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center; /* 항목들 사이에 공간을 균등하게 배분 */
  width: 100vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const MenuItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  text-align: center;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-bottom: 0;
  padding-right: 4rem;
  padding-top: 2rem;
  position: relative; // 상대적인 위치를 적용해 드롭다운과의 관계 설정
`;

export const Item = styled.div`
  display: flex;
  padding: 1rem 3rem;
  padding-bottom: 0;
  cursor: pointer;
  position: relative; // 드롭다운 메뉴를 이 안에 절대 위치시킬 수 있게 설정
  width: auto; // 고정된 넓이가 없도록 설정
  height: 100%;
`;
