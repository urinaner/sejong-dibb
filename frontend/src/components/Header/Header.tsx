import React, { useState } from 'react';
import {
  HeaderContainer,
  Logo,
  Nav,
  Menu,
  MenuItem,
} from '../../styles/HeaderStyles';
import NavItem from './NavItem';
import { ReactComponent as LogoIcon } from '../../assets/images/sejong-icon.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, width: 0 });

  // 수정된 URI 설계에 따른 navItems 배열
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
      path: '/undergraduate',
      menuItems: [
        { name: '교과과정', path: '/undergraduate/curriculum' },
        { name: '입학/장학', path: '/undergraduate/admissions' },
      ],
    },
    {
      title: '대학원',
      path: '/graduate',
      menuItems: [
        { name: '교과과정', path: '/graduate/curriculum' },
        { name: '입학/장학', path: '/graduate/admissions' },
      ],
    },
    {
      title: '세미나실 예약',
      path: '/seminar-rooms',
      menuItems: [{ name: '세미나실 예약', path: '/seminar-rooms/book' }],
    },
  ];

  const handleNavItemMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setActiveIndex(index);
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom,
      width: rect.width,
    });
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <HeaderContainer onMouseLeave={handleMouseLeave}>
      <Logo>
        <Link to="/">
          <LogoIcon width="50px" height="auto" />
          <span>세종대학교 바이오융합전공</span> {/* h1을 span으로 대체 */}
        </Link>
      </Logo>
      <Nav>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            title={item.title}
            path={item.path}
            onMouseEnter={(e) => handleNavItemMouseEnter(index, e)}
          />
        ))}
      </Nav>
      {activeIndex !== null && (
        <Menu>
          {navItems[activeIndex].menuItems.map((subItem, index) => (
            <MenuItem key={index}>
              <Link to={subItem.path} style={{ textDecoration: 'none' }}>
                {subItem.name}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      )}
    </HeaderContainer>
  );
};

export default Header;
