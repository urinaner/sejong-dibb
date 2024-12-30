import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { HeaderContainer, HeaderInner, HeaderNav } from './HeaderStyle';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import MobileMenu from './MobileMenu/MobileMenu';
import Profile from './Profile/Profile';
import { useHeaderScroll } from './hooks/useHeaderScroll';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const { isScrolled } = useHeaderScroll();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <HeaderContainer
      $isDropdownOpen={isDropdownOpen}
      style={{
        backgroundColor: isScrolled ? '#A30027' : '#C3002F',
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <HeaderInner>
        <Logo />
        <HeaderNav>
          <Navigation onDropdownChange={handleDropdownOpen} />
          <MobileMenu />
          {auth?.isAuthenticated && <Profile />}
        </HeaderNav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
