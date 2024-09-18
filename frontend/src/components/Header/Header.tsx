// Header.tsx
import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import Image from '../../assets/images/logo.png';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
`;

const Logo = styled.div`
  padding: 0.5rem 0;
  padding-left: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-right: 3rem;
`;

const Header = () => {
  const logo = <img src={Image} alt="로고" width={250} height={80}></img>;

  return (
    <HeaderContainer>
      <Logo>{logo}</Logo>
      <Nav>
        <NavItem title="학과" menuItems={['학과소개', '교수소개', '조직도']} />
        <NavItem title="대학" menuItems={['학부교과과정', '입학/장학']} />
        <NavItem title="대학원" menuItems={['교과과정', '학사/규정']} />
        <NavItem
          title="바융소식"
          menuItems={[
            '학부 공지사항',
            '대학원 공지사항',
            '세미나',
            '연구 논문',
            '채용공고',
          ]}
        />
        <NavItem title="세미나실 예약" menuItems={['세미나실 예약']} />
        {/* 추가 메뉴 아이템 */}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
