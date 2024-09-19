import React, { useState, useEffect } from 'react';
import { HeaderContainer, Logo, Nav } from '../../styles/HeaderStyles';
import NavItem from './NavItem';
import Image from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const logo = <img src={Image} alt="로고" width={250} height={80}></img>;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNavItemClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 버블링 방지
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      if (activeIndex !== null) {
        setActiveIndex(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [activeIndex]);

  const navItems = [
    { title: '학과', menuItems: ['학과소개', '교수소개', '조직도'] },
    { title: '대학', menuItems: ['학부교과과정', '입학/장학'] },
    { title: '대학원', menuItems: ['소개', '교과과정'] },
    { title: '발행소식', menuItems: ['공지사항', '세미나', '연구 논문'] },
    { title: '세미나실 예약', menuItems: ['세미나실 예약'] },
  ];

  return (
    <HeaderContainer>
      <Logo>{logo}</Logo>
      <Nav>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            title={item.title}
            isActive={activeIndex === index}
            onClick={(event) => handleNavItemClick(index, event)}
          />
        ))}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
