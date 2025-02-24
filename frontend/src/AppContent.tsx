import React, { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MainBanner from './components/Banner/MainBanner/MainBanner';
import PageBanner from './components/Banner/PageBanner/PageBanner';
import { MAIN_CONTENT, PAGE_CONTENTS } from './constants/pageContents';
import { mainVideos } from './config/videoConfig';
import { AppRoutes } from './routes/AppRoutes';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { AppLayout } from './components/layout/AppLayout';
import { usePageTransition } from './hooks/usePageTransition';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  scroll-behavior: smooth;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContentWrapper = styled(motion.main)<{ isAuthPage: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  align-items: center;
  padding: ${(props) => (props.isAuthPage ? '0' : '20px')};
`;

const BannerWrapper = styled(motion.div)<{ isAuthPage: boolean }>`
  position: relative;
  width: 100vw;
  z-index: 0;
  margin-top: ${(props) => (props.isAuthPage ? '0' : '125px')};
  margin-bottom: ${(props) => (props.isAuthPage ? '0' : '-60px')};
`;

function AppContent() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === '/';
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup';

  // 이전 방식: containerRef를 사용해 스크롤이 발생하는 요소에 대해 scrollIntoView를 호출
  useEffect(() => {
    const scrollToTop = () => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
        // 필요시 document.documentElement도 함께 스크롤
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const timeoutId = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  const getCurrentPageContent = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) return null;

    const mainCategory = Object.values(PAGE_CONTENTS).find(
      (content) => content.path === `/${pathSegments[0]}`,
    );

    if (!mainCategory) return null;

    if (pathSegments.length === 1) return mainCategory;

    const subPath = `/${pathSegments.join('/')}`;
    const subPage = Object.values(mainCategory.subPages || {}).find(
      (content) => content.path === subPath,
    );

    return subPage || mainCategory;
  };

  const pageContent = getCurrentPageContent();

  const isTransitioning = usePageTransition();

  return (
    <PageContainer ref={containerRef}>
      <BannerWrapper isAuthPage={isAuthPage}>
        <AnimatePresence mode="wait">
          {isHomePage ? (
            <MainBanner
              videos={mainVideos}
              autoPlayInterval={5000}
              logo={MAIN_CONTENT.logoSrc}
            />
          ) : (
            !isAuthPage && pageContent && <PageBanner content={pageContent} />
          )}
        </AnimatePresence>
      </BannerWrapper>
      <InnerContainer>
        <ContentWrapper isAuthPage={isAuthPage}>
          <AppLayout>
            <PageTransition>
              <AppRoutes />
            </PageTransition>
          </AppLayout>
        </ContentWrapper>
      </InnerContainer>
      {/* 전환 상태가 true일 때 로딩 스피너 표시 */}
      {isTransitioning && <LoadingSpinner />}
    </PageContainer>
  );
}

export default AppContent;
