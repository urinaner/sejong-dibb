import React, { useCallback } from 'react';
import {
  TopHeaderContainer,
  TopHeaderInner,
  TopHeaderTitle,
  TopNavList,
  TopNavItem,
} from './HeaderStyle';

const TopHeader: React.FC = () => {
  const scrollToBottom = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // 방법 1: requestAnimationFrame 사용
      const scrollToBottomSmooth = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const currentScroll = window.pageYOffset;
        const targetScroll = scrollHeight - window.innerHeight;
        const distance = targetScroll - currentScroll;

        // 이미 맨 아래라면 함수 종료
        if (distance <= 0) return;

        // 한 번에 이동할 거리 계산 (전체 거리의 10%)
        const step = Math.max(distance / 10, 10);

        window.scrollBy(0, step);

        if (window.pageYOffset < targetScroll) {
          requestAnimationFrame(scrollToBottomSmooth);
        }
      };

      // 방법 2: Element.scrollIntoView 사용
      const footer = document.querySelector('footer');
      if (footer) {
        try {
          footer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
          // scrollIntoView가 실패하면 requestAnimationFrame 방식 사용
          requestAnimationFrame(scrollToBottomSmooth);
        }
      } else {
        // footer를 찾지 못하면 requestAnimationFrame 방식 사용
        requestAnimationFrame(scrollToBottomSmooth);
      }
    },
    [],
  );

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
        </TopNavList>
      </TopHeaderInner>
    </TopHeaderContainer>
  );
};

export default TopHeader;
