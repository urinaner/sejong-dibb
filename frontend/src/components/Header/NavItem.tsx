import React from 'react';
import { Item } from '../../styles/HeaderStyles';

interface NavItemProps {
  title: string;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>; // 타입 정의 추가
}

const NavItem: React.FC<NavItemProps> = ({ title, onMouseEnter }) => {
  return (
    <Item onMouseEnter={onMouseEnter} className="nav-item">
      {' '}
      {title}
    </Item>
  );
};

export default NavItem;
