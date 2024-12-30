// Profile.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ReactComponent as UserIcon } from '../../../assets/images/user-icon.svg';
import {
  ProfileWrapper,
  ProfileButton,
  ProfileDropdown,
  ProfileDropdownItem,
  LoginButton,
} from './ProfileStyle';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = async () => {
    if (auth?.signout) {
      await auth.signout();
      setIsOpen(false);
    }
  };

  if (!auth?.isAuthenticated) {
    return <LoginButton onClick={handleSignIn}>로그인</LoginButton>;
  }

  return (
    <ProfileWrapper onMouseLeave={() => setIsOpen(false)}>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>
        <UserIcon />
        <span>{auth?.user}</span>
      </ProfileButton>
      {isOpen && (
        <ProfileDropdown>
          <ProfileDropdownItem>
            <span>
              {auth?.isAdmin ? '관리자' : '사용자'}: {auth?.user}
            </span>
          </ProfileDropdownItem>
          <ProfileDropdownItem onClick={handleSignOut}>
            로그아웃
          </ProfileDropdownItem>
        </ProfileDropdown>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
