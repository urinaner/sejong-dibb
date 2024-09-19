import React from 'react';
import { Item } from '../../styles/HeaderStyles';

interface NavItemProps {
  title: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, isActive, onClick }) => {
  return (
    <Item onClick={onClick} className="nav-item">
      {title}
      {isActive && (
        <div className="dropdown-menu">
          {/* 드롭다운 메뉴 콘텐츠를 여기에 넣습니다 */}
        </div>
      )}
    </Item>
  );
};

export default NavItem;
