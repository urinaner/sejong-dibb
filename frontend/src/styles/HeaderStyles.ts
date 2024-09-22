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
  }

  span {
    font-size: 1.5rem; /* 텍스트 크기 설정 */
    font-weight: bold;
    white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
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
`;

export const MenuItem = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  text-align: center;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 4rem;
  width: 100%;
`;

export const Item = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }
`;
