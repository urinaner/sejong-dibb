import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { navItems } from '../constants';
import {
  MobileMenuButton,
  MobileMenuWrapper,
  MobileMenuItem,
  MobileMenuTitle,
  MobileSubMenu,
  MobileSubMenuItem,
} from './MobileMenuStyle';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleSubmenu = (index: number) => {
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <>
      <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} color="white" />
      </MobileMenuButton>

      <MobileMenuWrapper isOpen={isOpen}>
        {navItems.map((item, index) => (
          <MobileMenuItem key={index}>
            <MobileMenuTitle
              onClick={() => toggleSubmenu(index)}
              isOpen={activeIndices.includes(index)}
            >
              {item.title}
              <ChevronDown size={20} color="white" />
            </MobileMenuTitle>

            <MobileSubMenu isOpen={activeIndices.includes(index)}>
              {item.menuItems.map((subItem, subIndex) => (
                <MobileSubMenuItem
                  key={subIndex}
                  to={subItem.path}
                  onClick={() => setIsOpen(false)}
                >
                  {subItem.name}
                </MobileSubMenuItem>
              ))}
            </MobileSubMenu>
          </MobileMenuItem>
        ))}
      </MobileMenuWrapper>
    </>
  );
};

export default MobileMenu;
