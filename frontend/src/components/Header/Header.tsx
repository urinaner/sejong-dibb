import React, { useState } from 'react';
import {
  HeaderContainer,
  Logo,
  Nav,
  Menu,
  MenuItem,
  StyledLink,
} from '../../styles/HeaderStyles';
import NavItem from './NavItem';
import { ReactComponent as LogoIcon } from '../../assets/images/sejong-icon.svg';

const Header: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navItems = [
    {
      title: '학과',
      path: '/about',
      menuItems: [
        { name: '학과소개', path: '/about' },
        { name: '교수소개', path: '/about/faculty' },
        { name: '조직도', path: '/about/organization' },
      ],
    },
    {
      title: '대학',
      path: '/undergraduate/curriculum',
      menuItems: [
        { name: '학부교과과정', path: '/undergraduate/curriculum' },
        {
          name: '입학/장학 (학사/입학)',
          path: '/undergraduate/admission-scholarship',
        },
      ],
    },
    {
      title: '대학원',
      path: '/graduate/overview',
      menuItems: [
        { name: '소개', path: '/graduate/overview' },
        { name: '교과과정', path: '/graduate/curriculum' },
      ],
    },
    {
      title: '바융소식',
      path: '/news',
      menuItems: [
        { name: '공지사항', path: '/news' },
        { name: '세미나', path: '/news' },
        { name: '연구 논문', path: '/news' },
        { name: '공지 사항 조회', path: '/news' },
        { name: '연구 논문 조회', path: '/news' },
        { name: '세미나실 예약', path: '/news' },
        { name: '세미나 조회', path: '/news' },
      ],
    },
    {
      title: '세미나실 예약',
      path: '/seminar-rooms/reservation',
      menuItems: [
        { name: '세미나실 예약', path: '/seminar-rooms/reservation' },
      ],
    },
  ];

  const handleNavItemMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <HeaderContainer onMouseLeave={handleMouseLeave}>
      <Logo>
        <StyledLink to="/">
          <LogoIcon width="50px" height="auto" />
          <span>세종대학교 바이오융합전공</span> {/* h1을 span으로 대체 */}
        </StyledLink>
      </Logo>
      <Nav>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            title={item.title}
            path={item.path}
            onMouseEnter={() => handleNavItemMouseEnter(index)}
          />
        ))}
      </Nav>
      {activeIndex !== null && (
        <Menu>
          {navItems[activeIndex].menuItems.map((subItem, index) => (
            <MenuItem key={index}>
              <StyledLink to={subItem.path}>{subItem.name}</StyledLink>
            </MenuItem>
          ))}
        </Menu>
      )}
    </HeaderContainer>
  );
};

export default Header;
