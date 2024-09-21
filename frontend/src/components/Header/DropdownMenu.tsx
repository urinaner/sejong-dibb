import React from 'react';
import { Menu, MenuItem } from '../../styles/HeaderStyles';

interface DropdownMenuProps {
  position: {
    left: number;
  };
  items: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ position, items }) => {
  return (
    <Menu style={{ left: position.left, transform: 'translateX(-50%)' }}>
      {' '}
      {/* 이 부분에서 자식 요소를 중앙 정렬 */}
      {items.map((item, index) => (
        <MenuItem key={index}>{item}</MenuItem>
      ))}{' '}
    </Menu>
  );
};

export default DropdownMenu;
