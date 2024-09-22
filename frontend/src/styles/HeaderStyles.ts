import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  box-sizing: border-box;
  margin: 0;

  /* 반응형 설정: 모바일에서 수직 정렬 */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
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
    width: 50px; /* 로고의 크기 조정 */
    height: auto;
    margin-right: 10px; /* 로고와 텍스트 사이의 간격 추가 */

    /* 모바일에서 로고 크기 축소 */
    @media (max-width: 768px) {
      width: 40px;
    }
  }

  span {
    font-size: 1.5rem; /* 텍스트 크기 설정 */
    font-weight: bold;
    white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */

    /* 모바일에서 텍스트 크기 축소 */
    @media (max-width: 768px) {
      font-size: 1.2rem;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  /* 모바일에서 메뉴 항목들이 수직으로 나열되도록 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MenuItem = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  text-align: center;

  /* 모바일에서 메뉴 항목의 패딩과 글자 크기를 줄임 */
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 4rem;
  width: 100%;

  /* 모바일에서 네비게이션 메뉴가 수직으로 배치되도록 설정 */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const Item = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }

  /* 모바일에서 네비게이션 항목 크기 축소 */
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
  }
`;
