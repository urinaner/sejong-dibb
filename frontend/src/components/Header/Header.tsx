import React, { useContext, useState } from 'react';
import { Menu } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import {
  HeaderContainer,
  HeaderInner,
  HeaderNav,
  HeaderNavList,
  HeaderActions,
  MobileMenuButton,
} from './HeaderStyle';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const { isScrolled, isVisible } = useHeaderScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContainer
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? '#A30027' : '#C3002F',
      }}
      transition={{ duration: 0.3 }}
    >
      <HeaderInner>
        {/* Logo will be added here */}
        <HeaderNav>
          <HeaderNavList>
            {/* Navigation items will be added here */}
          </HeaderNavList>
          <HeaderActions>
            <MobileMenuButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </MobileMenuButton>
            {/* Profile component will be added here */}
          </HeaderActions>
        </HeaderNav>
      </HeaderInner>
      {/* Mobile menu will be added here */}
    </HeaderContainer>
  );
};

export default Header;
