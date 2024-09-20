import React, { useState } from 'react';
import { Item } from '../../styles/HeaderStyles';
import DropdownMenu from './DropdownMenu';

interface NavItemProps {
  title: string;
  menuItems: string[];
}

const NavItem: React.FC<NavItemProps> = ({ title, menuItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Item
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="nav-item"
    >
      {title}
      {isDropdownOpen && <DropdownMenu items={menuItems} />}
    </Item>
  );
};

export default NavItem;
