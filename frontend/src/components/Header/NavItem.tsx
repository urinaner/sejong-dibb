// NavItem.tsx
import React from 'react';
import { Item, StyledLink } from './HeaderStyles';

interface NavItemProps {
  title: string;
  path: string;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  path,
  onMouseEnter,
  onClick,
}) => (
  <StyledLink to={path}>
    <Item onMouseEnter={onMouseEnter} onClick={onClick} className="nav-item">
      {title}
    </Item>
  </StyledLink>
);

export default NavItem;
