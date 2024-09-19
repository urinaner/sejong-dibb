import React from 'react';
import { Menu, MenuItem } from '../../styles/HeaderStyles';

interface DropdownMenuProps {
  items: string[];
  onToggle: () => void; // 드롭다운의 표시 상태를 토글하는 함수
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onToggle }) => {
  return (
    <Menu onClick={onToggle}>
      {' '}
      // 클릭 이벤트로 드롭다운을 토글
      {items.map((item, index) => (
        <MenuItem key={index}>{item}</MenuItem>
      ))}
    </Menu>
  );
};

export default DropdownMenu;
