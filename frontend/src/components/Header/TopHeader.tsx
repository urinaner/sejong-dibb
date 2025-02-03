import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TopHeaderContainer,
  TopHeaderInner,
  TopHeaderTitle,
  TopNavList,
  TopNavItem,
} from './HeaderStyle';
import { AuthContext } from '../../context/AuthContext';

const TopHeader: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const scrollToBottom = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const scrollToBottomSmooth = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const currentScroll = window.pageYOffset;
        const targetScroll = scrollHeight - window.innerHeight;
        const distance = targetScroll - currentScroll;

        if (distance <= 0) return;
        const step = Math.max(distance / 10, 10);
        window.scrollBy(0, step);

        if (window.pageYOffset < targetScroll) {
          requestAnimationFrame(scrollToBottomSmooth);
        }
      };

      const footer = document.querySelector('footer');
      if (footer) {
        try {
          footer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
          requestAnimationFrame(scrollToBottomSmooth);
        }
      } else {
        requestAnimationFrame(scrollToBottomSmooth);
      }
    },
    [],
  );

  const handleAuthAction = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (auth?.isAuthenticated) {
      await auth.signout();
    } else {
      navigate('/signin');
    }
  };

  return (
    <TopHeaderContainer>
      <TopHeaderInner>
        <TopHeaderTitle>SEJONG UNIVERSITY</TopHeaderTitle>
        <TopNavList>
          <TopNavItem>
            <a href="http://sejong.ac.kr/">HOME</a>
          </TopNavItem>
          <TopNavItem>
            <a href="/about/organization">CONTACT</a>
          </TopNavItem>
          <TopNavItem>
            <a
              href="#footer"
              onClick={scrollToBottom}
              style={{ cursor: 'pointer' }}
            >
              SITEMAP
            </a>
          </TopNavItem>
          <TopNavItem>
            <a
              href="#"
              onClick={handleAuthAction}
              style={{ cursor: 'pointer' }}
            >
              {auth?.isAuthenticated ? 'LOGOUT' : 'LOGIN'}
            </a>
          </TopNavItem>
        </TopNavList>
      </TopHeaderInner>
    </TopHeaderContainer>
  );
};

export default TopHeader;
