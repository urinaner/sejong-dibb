import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '../../styles/HeaderStyles';

interface DropdownMenuProps {
  position: {
    left: number;
  };
  items: { name: string; path: string }[]; // 아이템의 이름과 경로를 함께 관리
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ position, items }) => {
  return (
    <Menu>
      {items.map((item, index) => (
        <MenuItem key={index}>
          <Link
            to={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {item.name}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu;
