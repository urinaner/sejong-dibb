import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ReactComponent as UserIcon } from '../../../assets/images/user-icon.svg';
import {
  ProfileWrapper,
  ProfileButton,
  ProfileDropdown,
  ProfileDropdownItem,
} from './ProfileStyle';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (auth?.signout) {
      await auth.signout();
      setIsOpen(false);
      navigate('/signin');
    }
  };

  return (
    <ProfileWrapper onMouseLeave={() => setIsOpen(false)}>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>
        <UserIcon />
        <span>{auth?.user}</span>
      </ProfileButton>
      {isOpen && (
        <ProfileDropdown>
          <ProfileDropdownItem>
            <span>관리자: {auth?.user}</span>
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
