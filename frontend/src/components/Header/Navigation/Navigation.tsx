import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import { AuthContext } from '../../../context/AuthContext';
import NavItem from './NavItem';
import Profile from '../Profile/Profile';
import {
  NavigationWrapper,
  MobileNavigationWrapper,
  MobileNavItem,
  MobileNavButton,
  MobileSubMenu,
  LoginButton,
  NavigationRightSection,
} from './NavigationStyle';

interface NavigationProps {
  onDropdownChange?: (isOpen: boolean) => void;
}

interface MenuItem {
  name: string;
  path: string;
}

interface NavigationItem {
  title: string;
  path: string;
  menuItems: MenuItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: '학과',
    path: '/about',
    menuItems: [
      { name: '학과소개', path: '/about' },
      { name: '조직도', path: '/about/organization' },
      { name: '교수소개', path: '/about/faculty' },
    ],
  },
  {
    title: '대학',
    path: '/undergraduate/curriculum',
    menuItems: [
      { name: '학사안내', path: '/college/guide' },
      { name: '학부교과과정', path: '/undergraduate/curriculum' },
      { name: '입학/장학', path: '/undergraduate/admission-scholarship' },
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
      { name: '학부뉴스', path: '/news' },
      { name: '공지사항', path: '/news/noticeboard' },
      { name: '세미나', path: '/news/seminar' },
      { name: '연구논문', path: '/news/thesis' },
    ],
  },
  {
    title: '⏱ 서비스',
    path: '/seminar-rooms/reservation',
    menuItems: [{ name: '세미나실 예약', path: '/seminar-rooms/reservation' }],
  },
];

const Navigation: React.FC<NavigationProps> = ({ onDropdownChange }) => {
  const { isMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDropdownOpen = (isOpen: boolean) => {
    setIsAnyDropdownOpen(isOpen);
    onDropdownChange?.(isOpen);
  };

  const handleMouseEnter = () => {
    handleDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    handleDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenSubMenus({});
  };

  const handleSignIn = () => {
    navigate('/signin');
    closeMobileMenu();
  };

  const renderAuthSection = () => {
    if (auth?.isAuthenticated) {
      return <Profile />;
    }
    return <LoginButton onClick={handleSignIn}>로그인</LoginButton>;
  };

  if (isMobile) {
    return (
      <MobileNavigationWrapper isOpen={mobileMenuOpen}>
        {navigationItems.map((item, index) => (
          <MobileNavItem key={index}>
            <MobileNavButton type="button" onClick={() => toggleSubMenu(index)}>
              {item.title}
            </MobileNavButton>
            <MobileSubMenu isOpen={openSubMenus[index] || false}>
              {item.menuItems.map((subItem, subIndex) => (
                <MobileNavButton
                  key={`${index}-${subIndex}`}
                  onClick={closeMobileMenu}
                  as="a"
                  href={subItem.path}
                >
                  {subItem.name}
                </MobileNavButton>
              ))}
            </MobileSubMenu>
          </MobileNavItem>
        ))}
        <MobileNavItem>{renderAuthSection()}</MobileNavItem>
      </MobileNavigationWrapper>
    );
  }

  return (
    <NavigationWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {navigationItems.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          path={item.path}
          menuItems={item.menuItems}
        />
      ))}
      <NavigationRightSection>{renderAuthSection()}</NavigationRightSection>
    </NavigationWrapper>
  );
};

export default Navigation;
