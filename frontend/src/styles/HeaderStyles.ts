// src/styles/HeaderStyles.ts
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: relative; // 위치 기준 설정
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 0;
`;

export const Logo = styled.div`
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%; // 부모의 전체 높이 아래에 메뉴가 표시되도록 설정
  width: 100%; // 전체 너비로 확장
  left: 0; // 왼쪽 정렬
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const MenuItem = styled.div`
  padding: 1rem 2rem; /* 패딩을 늘려서 요소 크기를 확대 */
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
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
  padding: 0.5rem 3rem;
  padding-bottom: 0;
  cursor: pointer;
  position: relative; // 드롭다운 메뉴를 이 안에 절대 위치시킬 수 있게 설정
  width: auto; // 고정된 넓이가 없도록 설정
  height: 100%;
`;
