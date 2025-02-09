import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';
import { AuthContext } from '../../../context/AuthContext';
import NavItem from './NavItem';
import { navItems as navigationItems } from '../constants';

import Profile from '../Profile/Profile';
import {
  NavigationWrapper,
  MobileNavigationWrapper,
  MobileNavItem,
  MobileNavButton,
  MobileSubMenu,
} from './NavigationStyle';
import { navItems } from '../constants';

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
