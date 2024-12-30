import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { HeaderContainer, HeaderInner, HeaderNav } from './HeaderStyles';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import MobileMenu from './MobileMenu/MobileMenu';
import Profile from './Profile/Profile';
import { useHeaderScroll } from './Hooks/useHeaderScroll';

const Header = () => {
  const auth = useContext(AuthContext);
  const { isScrolled, isVisible } = useHeaderScroll();

  return (
    <HeaderContainer
      style={{
        transform: `translateY(${!isVisible ? '-100%' : '0'})`,
        backgroundColor: isScrolled ? '#A30027' : '#C3002F',
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <HeaderInner>
        <Logo />
        <HeaderNav>
          <Navigation />
          <MobileMenu />
          {auth?.isAuthenticated && <Profile />}
        </HeaderNav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
