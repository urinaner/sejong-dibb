import React from 'react';
import { Item, StyledLink } from '../../styles/HeaderStyles';

interface NavItemProps {
  title: string;
  path: string;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
}

const NavItem: React.FC<NavItemProps> = ({ title, path, onMouseEnter }) => {
  return (
    <StyledLink to={path}>
      <Item
        onMouseEnter={onMouseEnter}
        className="nav-item"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {title}
      </Item>
    </StyledLink>
  );
};

export default NavItem;
