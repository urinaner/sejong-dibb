import React from 'react';
import { Menu, MenuItem } from '../../styles/HeaderStyles';

interface DropdownMenuProps {
  items: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  return (
    <Menu>
      {items.map((item, index) => (
        <MenuItem key={index}>{item}</MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu;
