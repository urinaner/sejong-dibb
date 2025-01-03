import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  NavItemWrapper,
  NavItemLink,
  SubMenu,
  SubMenuItem,
} from './NavItemStyle';
import { NavItemProps } from '../types';

const NavItem: React.FC<NavItemProps> = ({ title, path, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);

  return (
    <NavItemWrapper
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavItemLink to={path} isActive={isActive}>
        {title}
      </NavItemLink>
      <SubMenu isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <SubMenuItem key={index} to={item.path}>
            {item.name}
          </SubMenuItem>
        ))}
      </SubMenu>
    </NavItemWrapper>
  );
};

export default NavItem;
