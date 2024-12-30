import React, { useState } from 'react';
import { HeaderContainer, HeaderInner, HeaderNav } from './HeaderStyle';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import MobileMenu from './MobileMenu/MobileMenu';
import { useHeaderScroll } from './hooks/useHeaderScroll';

const Header: React.FC = () => {
  const { isScrolled } = useHeaderScroll();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <Logo />
        <HeaderNav>
          <Navigation onDropdownChange={handleDropdownOpen} />
          <MobileMenu />
        </HeaderNav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
