// src/AppContent.tsx
import React from 'react';
import styled from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Main from './pages/Main/Main';
import SignInPage from './pages/Auth/SignInPage';
import Hyperlink from './pages/Undergraduate/Hyperlink';
import GraduateOverview from './pages/Graduate/GraduateOverview';
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

import mainImage from './assets/images/main_picture.svg';
import Curriculum from './pages/Undergraduate/Curriculum/Curriculum';

import NotFound from './components/Notfound/NotFound';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const ContentWrapper = styled.main<{ isAuthPage: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.isAuthPage ? 'center' : 'flex-start')};
  padding: ${(props) => (props.isAuthPage ? '0' : '20px')};
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const MainImage = styled.img<{ isHomePage: boolean; hide: boolean }>`
  width: 100%;
  height: ${(props) => (props.isHomePage ? '60vh' : '30vh')};
  object-fit: cover;
  margin-bottom: ${(props) => (props.isHomePage ? '40px' : '20px')};
  transition: height 0.3s ease;
  display: ${(props) => (props.hide ? 'none' : 'block')};
`;

const MainImageWrapper = styled.div<{ hide: boolean }>`
  width: 100%;
  position: relative;
  overflow: hidden;
  display: ${(props) => (props.hide ? 'none' : 'block')};
`;

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage =
    location.pathname === '/admin/signin' ||
    location.pathname === '/admin/signup';

  return (
    <PageContainer>
      <Header />
      <MainImageWrapper hide={false}>
        <MainImage
          src={mainImage}
          alt="Main Visual"
          isHomePage={isHomePage}
          hide={false}
        />
      </MainImageWrapper>
      <ContentWrapper isAuthPage={false}>
        <Routes>
          {/* 공개 Routes */}
          <Route path="/" element={<Main />} />

          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/undergraduate/admission-scholarship"
            element={<Hyperlink />}
          />
          <Route path="/undergraduate/curriculum" element={<Curriculum />} />
          {/* graduate */}
          <Route path="graduate/overview" element={<GraduateOverview />} />
          {/*  about */}
          <Route path="/about" element={<Overview />} />
          <Route path="/about/faculty" element={<Professor />} />
          <Route path="/about/faculty/:id" element={<ProfessorDetail />} />
          {/*  news */}
          <Route path="/news/noticeboard" element={<NoticeBoard />} />
          <Route path="/news/noticeboard/:id" element={<NoticeDetail />} />
          <Route path="/seminar-rooms/reservation" element={<Reservation />} />
          <Route path="/news/thesis" element={<ThesisList />} />
          <Route path="/news/thesis/:id" element={<ThesisDetail />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}

export default AppContent;
