import React from 'react';
import {
  TopHeaderContainer,
  TopHeaderInner,
  TopNavList,
  TopNavItem,
} from './HeaderStyle';

const TopHeader: React.FC = () => {
  return (
    <TopHeaderContainer>
      <TopHeaderInner>
        <TopNavList>
          <TopNavItem>
            <a href="/home">HOME</a>
          </TopNavItem>
          <TopNavItem>
            <a href="/contact">CONTACT</a>
          </TopNavItem>
          <TopNavItem>
            <a href="/sitemap">SITEMAP</a>
          </TopNavItem>
        </TopNavList>
      </TopHeaderInner>
    </TopHeaderContainer>
  );
};

export default TopHeader;
