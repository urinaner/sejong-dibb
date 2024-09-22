import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../styles/HeaderStyles';

interface NavItemProps {
  title: string;
  path: string;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
}

const NavItem: React.FC<NavItemProps> = ({ title, path, onMouseEnter }) => {
  return (
    <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Item onMouseEnter={onMouseEnter} className="nav-item">
        {title}
      </Item>
    </Link>
  );
};

export default NavItem;
