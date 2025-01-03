import React, { useState } from 'react';
import { HeaderContainer, HeaderInner, HeaderNav } from './HeaderStyle';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import { useResponsive } from '../../hooks/useResponsive';
import MobileMenu from './MobileMenu/MobileMenu';

const Header: React.FC = () => {
  const { isScrolled } = useHeaderScroll();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleDropdownOpen = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <HeaderContainer
      $isDropdownOpen={isDropdownOpen}
      style={{
        backgroundColor: '#A30027',
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <HeaderInner>
        <Logo compact={isMobile} />
        <HeaderNav>
          {isMobile ? (
            <MobileMenu />
          ) : (
            <Navigation onDropdownChange={handleDropdownOpen} />
          )}
        </HeaderNav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
