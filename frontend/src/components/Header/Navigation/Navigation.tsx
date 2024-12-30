import React, { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import NavItem from './NavItem';
import {
  NavigationWrapper,
  MobileNavigationWrapper,
  MobileNavItem,
  MobileNavButton,
  MobileSubMenu,
} from './NavigationStyle';
import { PAGE_CONTENTS } from '../../../constants/pageContents';

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
    title: PAGE_CONTENTS.about.title,
    path: PAGE_CONTENTS.about.path,
    menuItems: [
      { name: '학과소개', path: '/about' },
      { name: '교수진', path: '/about/faculty' },
      { name: '조직도', path: '/about/organization' },
    ],
  },
  {
    title: PAGE_CONTENTS.undergraduate.title,
    path: PAGE_CONTENTS.undergraduate.path,
    menuItems: [
      { name: '교과과정', path: '/undergraduate/curriculum' },
      { name: '관련사이트', path: '/undergraduate/hyperlinks' },
    ],
  },
  {
    title: PAGE_CONTENTS.graduate.title,
    path: PAGE_CONTENTS.graduate.path,
    menuItems: [{ name: '대학원 소개', path: '/graduate' }],
  },
  {
    title: PAGE_CONTENTS.news.title,
    path: PAGE_CONTENTS.news.path,
    menuItems: [
      { name: '공지사항', path: '/news/notice' },
      { name: '학술논문', path: '/news/thesis' },
    ],
  },
  {
    title: PAGE_CONTENTS.seminar.title,
    path: PAGE_CONTENTS.seminar.path,
    menuItems: [{ name: '예약하기', path: '/seminar-rooms' }],
  },
];

const Navigation: React.FC<NavigationProps> = ({ onDropdownChange }) => {
  const { isMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);

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
    </NavigationWrapper>
  );
};

export default Navigation;
