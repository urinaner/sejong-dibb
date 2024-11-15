import styled from 'styled-components';

interface StyledButtonProps {
  isActive?: boolean;
}

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

// 세종대학교 컬러 상수
const colors = {
  primary: '#B71C1C', // 세종대 메인 레드
  primaryDark: '#8B0000', // 더 진한 레드
  primaryLight: '#D32F2F', // 더 밝은 레드
  hover: '#F5F5F5', // 호버시 밝은 회색
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 10px;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 30px;
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${colors.primary};
`;

export const NavButtonGroup = styled.div`
  display: flex;
`;

export const NavButton = styled.button<StyledButtonProps>`
  padding: 12px 32px;
  font-size: 1.1rem;
  border: none;
  background: ${(props) => (props.isActive ? colors.primary : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? colors.primaryDark : colors.hover};
    color: ${(props) => (props.isActive ? 'white' : colors.primary)};
  }

  ${(props) =>
    props.isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${colors.primary};
    }
  `}

  ${media.mobile} {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;
