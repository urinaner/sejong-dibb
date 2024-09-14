// Header.tsx
import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;
`;

const Logo = styled.div`
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Sejong University</Logo>
      <Nav>
        <NavItem title="학과" />
        <NavItem title="대학" />
        <NavItem title="대학원" />
        <NavItem title="연구소" />
        <NavItem title="발행소식" />
        <NavItem title="커뮤니티" />
        {/* 여기에 더 많은 NavItem 추가 */}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
