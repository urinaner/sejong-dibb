import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  position: absolute;
  width: 100%; /* 전체 너비로 확장 */
  left: 0; /* 왼쪽 정렬 */
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 1; /* 다른 요소 위에 메뉴가 나타나도록 설정 */
`;

const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

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
