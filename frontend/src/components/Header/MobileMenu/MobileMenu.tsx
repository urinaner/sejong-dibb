import React, { useState, useContext } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ReactComponent as UserIcon } from '../../../assets/images/user-icon.svg';
import { navItems } from '../constants';
import {
  MobileMenuButton,
  MobileMenuWrapper,
  MobileMenuItem,
  MobileMenuTitle,
  MobileSubMenu,
  MobileSubMenuItem,
  MobileAuthSection,
  MobileLoginButton,
  MobileUserProfile,
  MobileLogoutButton,
} from './MobileMenuStyle';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const toggleSubmenu = (index: number) => {
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleSignIn = () => {
    navigate('/signin');
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    if (auth?.signout) {
      await auth.signout();
      setIsOpen(false);
    }
  };

  return (
    <>
      <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} color="white" />
      </MobileMenuButton>

      <MobileMenuWrapper isOpen={isOpen}>
        {navItems.map((item, index) => (
          <MobileMenuItem key={index}>
            <MobileMenuTitle
              onClick={() => toggleSubmenu(index)}
              isOpen={activeIndices.includes(index)}
            >
              {item.title}
              <ChevronDown size={20} color="white" />
            </MobileMenuTitle>

            <MobileSubMenu isOpen={activeIndices.includes(index)}>
              {item.menuItems.map((subItem, subIndex) => (
                <MobileSubMenuItem
                  key={subIndex}
                  to={subItem.path}
                  onClick={() => setIsOpen(false)}
                >
                  {subItem.name}
                </MobileSubMenuItem>
              ))}
            </MobileSubMenu>
          </MobileMenuItem>
        ))}

        <MobileAuthSection>
          {auth?.isAuthenticated ? (
            <>
              <MobileUserProfile>
                <UserIcon />
                <span>{auth.user}</span>
              </MobileUserProfile>
              <MobileLogoutButton onClick={handleSignOut}>
                로그아웃
              </MobileLogoutButton>
            </>
          ) : (
            <MobileLoginButton onClick={handleSignIn}>로그인</MobileLoginButton>
          )}
        </MobileAuthSection>
      </MobileMenuWrapper>
    </>
  );
};

export default MobileMenu;
