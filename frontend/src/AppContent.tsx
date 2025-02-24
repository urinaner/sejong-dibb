import React, { useEffect } from 'react';
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

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AnimatedContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BannerWrapper = styled.div<{ $isAuthPage: boolean }>`
  position: relative;
  width: 100vw;
  z-index: ${({ theme }) => theme.layout.zIndexes.base};
  margin-top: ${(props) => (props.$isAuthPage ? '0' : '125px')};
  margin-bottom: ${(props) => (props.$isAuthPage ? '0' : '-60px')};
`;

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup';

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <PageWrapper>
      <BannerWrapper $isAuthPage={isAuthPage}>
        {isHomePage ? (
          <MainBanner
            videos={mainVideos}
            autoPlayInterval={5000}
            logo={MAIN_CONTENT.logoSrc}
          />
        ) : (
          !isAuthPage && pageContent && <PageBanner content={pageContent} />
        )}
      </BannerWrapper>

      <ContentWrapper>
        <AnimatePresence mode="wait">
          <AnimatedContent key={location.pathname} {...pageTransition}>
            <React.Suspense fallback={<LoadingSpinner />}>
              <AppLayout type={isAuthPage ? 'auth' : 'default'}>
                <AppRoutes />
              </AppLayout>
            </React.Suspense>
          </AnimatedContent>
        </AnimatePresence>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default AppContent;
