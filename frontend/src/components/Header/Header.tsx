import React, { useState } from 'react';
import {
  HeaderContainer,
  Logo,
  Nav,
  Menu,
  MenuItem,
} from '../../styles/HeaderStyles';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import Image from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const logo = <img src={Image} alt="로고" width={250} height={80}></img>;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, width: 0 });

  const navItems = [
    { title: '학과', menuItems: ['학과소개', '교수소개', '조직도'] },
    { title: '대학', menuItems: ['학부교과과정', '입학/장학'] },
    { title: '대학원', menuItems: ['소개', '교과과정'] },
    { title: '발행소식', menuItems: ['공지사항', '세미나', '연구 논문'] },
    { title: '세미나실 예약', menuItems: ['세미나실 예약'] },
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
      <Logo>{logo}</Logo>
      <Nav>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            title={item.title}
            onMouseEnter={(e) => handleNavItemMouseEnter(index, e)}
          />
        ))}
      </Nav>
      {activeIndex !== null && (
        <Menu style={{ top: menuPosition.top }}>
          {navItems[activeIndex].menuItems.map((item, index) => (
            <MenuItem key={index}>{item}</MenuItem>
          ))}
        </Menu>
      )}
    </HeaderContainer>
  );
};

export default Header;
