import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem; /* 패딩을 줄여서 헤더 크기 조정 */
  box-sizing: border-box;
  margin: 0;
  z-index: 1000; /* 헤더가 최상단에 유지되도록 설정 */

  /* 반응형 설정: 모바일에서 수직 정렬 및 스크롤 가능 */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 1rem; /* 모바일에서 패딩 더 줄이기 */
    overflow-x: auto; /* 헤더를 가로 스크롤 가능하게 설정 */
  }
`;

export const Logo = styled.div`
  display: flex; /* 수평 정렬을 위해 flexbox 사용 */
  align-items: center; /* 로고와 텍스트를 수직으로 중앙 정렬 */

  a {
    display: flex;
    align-items: center;
    text-decoration: none; /* 링크의 밑줄을 제거 */
    color: inherit; /* 텍스트 색상 유지 */
  }

  svg {
    width: 40px; /* 로고의 크기 축소 */
    height: auto;
    margin-right: 5px; /* 로고와 텍스트 사이의 간격 축소 */

    /* 모바일에서 로고 크기 더 축소 */
    @media (max-width: 768px) {
      width: 30px;
      margin-right: 0; /* 로고 옆에 간격 없애기 */
    }
  }

  span {
    font-size: 1.2rem; /* 텍스트 크기 축소 */
    font-weight: bold;
    white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */

    /* 모바일에서 텍스트 숨기기 */
    @media (max-width: 768px) {
      display: none; /* 텍스트를 숨기고 아이콘만 표시 */
    }
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 박스 그림자 축소 */
  z-index: 1000;

  /* 모바일에서 메뉴 항목들이 수직으로 나열되도록 */
  @media (max-width: 768px) {
    flex-direction: column;
    max-height: 40vh; /* 메뉴의 최대 높이를 더 제한하여 스크롤 가능하게 설정 */
    overflow-y: auto; /* 세로 스크롤 가능하게 설정 */
  }
`;

export const MenuItem = styled.div`
  padding: 0.5rem 1rem; /* 메뉴 항목의 패딩을 줄여서 크기 축소 */
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  text-align: center;

  /* 모바일에서 메뉴 항목의 패딩과 글자 크기 더 축소 */
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 2rem; /* 패딩을 줄여서 네비게이션 크기 축소 */
  width: 100%;

  /* 모바일에서 네비게이션 메뉴가 수직으로 배치되도록 설정 */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.5rem 1rem; /* 모바일에서 패딩 축소 */
    overflow-x: auto; /* 네비게이션 메뉴가 가로로 스크롤되도록 설정 */
  }
`;

export const Item = styled.div`
  padding: 0.5rem 1rem; /* 네비게이션 항목의 패딩 축소 */
  cursor: pointer;
  position: relative;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }

  /* 모바일에서 네비게이션 항목 크기 더 축소 */
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #333; /* Hover 시 텍스트 색상 */
  }

  &:active {
    color: #555; /* Active 상태에서 텍스트 색상 */
  }
`;
