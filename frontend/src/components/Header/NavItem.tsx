// NavItem.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import DropdownMenu from './DropdownMenu';

const Item = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;

interface NavItemProps {
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Item
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {title}
      {isOpen && <DropdownMenu />}
    </Item>
  );
};

export default NavItem;
