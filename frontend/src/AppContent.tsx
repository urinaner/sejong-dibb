import React, { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainBanner from './components/Banner/MainBanner/MainBanner';
import PageBanner from './components/Banner/PageBanner/PageBanner';
import { MAIN_CONTENT, PAGE_CONTENTS } from './constants/pageContents';

// Pages imports...
import Main from './pages/Main/Main';
import SignInPage from './pages/Auth/SignInPage';
import Hyperlink from './pages/Undergraduate/Hyperlink';
import GraduateOverview from './pages/Graduate/GraduateOverview';
import GraduateCurriculum from './pages/Graduate/GraduateCurriculum';
import Overview from './pages/About/About';
import Professor from './pages/About/Faculty/Professor';
import NoticeBoard from './pages/News/NoticeBoard/NoticeBoard';
import NoticeDetail from './pages/News/NoticeBoard/NoticeDetail';
import NoticeCreate from './pages/News/NoticeBoard/NoticeCreate';
import NoticeEdit from './pages/News/NoticeBoard/NoticeEdit';
import ProfessorEdit from './pages/About/Faculty/ProfessorEdit';
import ProfessorDetail from './pages/About/Faculty/ProfessorDetail';
import ProfessorCreate from './pages/About/Faculty/ProfessorCreate';
import Reservation from './pages/SeminarRoom/Reservation';
import ThesisList from './pages/News/Thesis/ThesisList';
import ThesisCreate from './pages/News/Thesis/ThesisCreate';
import ThesisEdit from './pages/News/Thesis/ThesisEdit';
import ThesisDetail from './pages/News/Thesis/ThesisDetail';
import Organization from './pages/About/Organization/Organization';

import mainImage from './assets/images/main_picture.svg';
import Curriculum from './pages/Undergraduate/Curriculum/Curriculum';

import NotFound from './components/Notfound/NotFound';
import SeminarList from './pages/Seminar/SeminarList';
import SeminarDetail from './pages/Seminar/SeminarDetail';
import SeminarCreate from './pages/Seminar/SeminarCreate';
import SeminarEdit from './pages/Seminar/SeminarEdit';
import News from './pages/News/News/News';
import NewsDetail from './pages/News/News/NewsDetail';
import NewsCreate from './pages/News/News/NewsCreate';

interface PageTransitionProps {
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
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
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const InnerContainer = styled.div`
  max-width: 1920px;
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
  height: 100%;
  align-items: center;
  justify-content: ${(props) => (props.isAuthPage ? 'center' : 'flex-start')};
  padding: ${(props) => (props.isAuthPage ? '0' : '20px')};
  position: relative;
  z-index: 1;
  background-color: white;
  margin-top: ${(props) => (props.isAuthPage ? '0' : '0')};
  border-radius: ${(props) => (props.isAuthPage ? '0' : '20px 20px 0 0')};
`;

const BannerWrapper = styled(motion.div)<{ isAuthPage: boolean }>`
  position: relative;
  width: 100vw;
  z-index: 0;
  margin-bottom: ${(props) => (props.isAuthPage ? '0' : '-60px')};
`;

function AppContent() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === '/';
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup';

  useEffect(() => {
    const scrollToTop = () => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    // 약간의 지연 후 스크롤 실행 (페이지 전환 애니메이션이 완료된 후)
    const timeoutId = setTimeout(scrollToTop, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const getCurrentPageContent = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) return null;

    const mainCategory = Object.values(PAGE_CONTENTS).find(
      (content) => content.path === `/${pathSegments[0]}`,
    );

    if (!mainCategory) return null;

    // If we're at the main category page, return the main category content
    if (pathSegments.length === 1) return mainCategory;

    // If we're at a sub-page, find the matching sub-page content
    const subPath = `/${pathSegments.join('/')}`;
    const subPage = Object.values(mainCategory.subPages || {}).find(
      (content) => content.path === subPath,
    );

    return subPage || mainCategory;
  };

  const pageContent = getCurrentPageContent();

  return (
    <PageContainer ref={containerRef}>
      <Header />
      <BannerWrapper isAuthPage={isAuthPage}>
        <AnimatePresence mode="wait">
          {isHomePage ? (
            <MainBanner
              videoSrc={MAIN_CONTENT.videoSrc}
              title={MAIN_CONTENT.title}
              logo={MAIN_CONTENT.logoSrc}
            />
          ) : (
            !isAuthPage && pageContent && <PageBanner content={pageContent} />
          )}
        </AnimatePresence>
      </BannerWrapper>
      <InnerContainer>
        <ContentWrapper isAuthPage={isAuthPage}>
          <PageTransition>
            <Routes>
              {/* 공개 Routes */}
              <Route path="/" element={<Main />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route
                path="/undergraduate/admission-scholarship"
                element={<Hyperlink />}
              />
              <Route
                path="/undergraduate/curriculum"
                element={<Curriculum />}
              />

              {/* graduate */}
              <Route path="graduate/overview" element={<GraduateOverview />} />
              <Route
                path="graduate/curriculum"
                element={<GraduateCurriculum />}
              />

              {/* about */}
              <Route path="/about" element={<Overview />} />
              <Route path="/about/faculty" element={<Professor />} />
              <Route path="/about/faculty/:id" element={<ProfessorDetail />} />
              <Route path="/about/organization" element={<Organization />} />

              {/* news */}
              <Route path="/news/noticeboard" element={<NoticeBoard />} />
              <Route path="/news/noticeboard/:id" element={<NoticeDetail />} />
              <Route
                path="/seminar-rooms/reservation"
                element={<Reservation />}
              />
              <Route path="/news/seminar" element={<SeminarList />} />
              <Route path="/news/seminar/:id" element={<SeminarDetail />} />
              <Route path="/news/thesis" element={<ThesisList />} />
              <Route path="/news/thesis/:id" element={<ThesisDetail />} />
              {/*학부 뉴스*/}
              <Route path="/news" element={<News />} />
              <Route path="/news/:newsId" element={<NewsDetail />} />

              {/* 어드민 권한 보호 Routes */}
              <Route
                path="/about/faculty/edit/:id"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <ProfessorEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about/faculty/create"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <ProfessorCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/noticeboard/create"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <NoticeCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/noticeboard/edit/:id"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <NoticeEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/thesis/create"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <ThesisCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/thesis/edit/:id"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <ThesisEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/seminar/create"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <SeminarCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/seminar/edit/:id"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <SeminarEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/create"
                element={
                  <ProtectedRoute requireAuth requireAdmin>
                    <NewsCreate />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </ContentWrapper>
      </InnerContainer>
      <Footer />
    </PageContainer>
  );
}

export default AppContent;
