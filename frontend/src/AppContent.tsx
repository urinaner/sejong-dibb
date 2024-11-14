import React from 'react';
import styled from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Main from './pages/Main/Main';
import SignIn from './pages/Auth/SignIn';
import Hyperlink from './pages/Undergraduate/Hyperlink';
import Overview from './pages/About/About';
import Professor from './pages/About/Faculty/Professor';
import NoticeBoard from './pages/News/NoticeBoard/NoticeBoard';
import mainImage from './assets/images/main_picture.svg';
import NoticeDetail from './pages/News/NoticeBoard/NoticeDetail';
import NoticeCreate from './pages/News/NoticeBoard/NoticeCreate';
import NoticeEdit from './pages/News/NoticeBoard/NoticeEdit';
import ProfessorEdit from './pages/About/Faculty/ProfessorEdit';
import ProfessorDtail from './pages/About/Faculty/ProfessorDetail';
import ProfessorCreate from './pages/About/Faculty/ProfessorCreate';

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
    location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <PageContainer>
      <Header />
      <MainImageWrapper hide={isAuthPage}>
        <MainImage
          src={mainImage}
          alt="Main Visual"
          isHomePage={isHomePage}
          hide={isAuthPage}
        />
      </MainImageWrapper>
      <ContentWrapper isAuthPage={isAuthPage}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/undergraduate/admission-scholarship"
            element={<Hyperlink />}
          />
          <Route path="/about" element={<Overview />} />
          <Route path="/about/faculty" element={<Professor />} />
          <Route path="/about/faculty/edit/:id" element={<ProfessorEdit />} />
          <Route path="/about/faculty/:id" element={<ProfessorDtail />} />
          <Route path="/about/faculty/create" element={<ProfessorCreate />} />
          <Route path="/news/noticeboard" element={<NoticeBoard />} />
          <Route path="/news/noticeboard/:id" element={<NoticeDetail />} />
          <Route path="/news/noticeboard/create" element={<NoticeCreate />} />
          <Route path="/news/noticeboard/edit/:id" element={<NoticeEdit />} />
        </Routes>
      </ContentWrapper>
      <Footer />
      <Modal />
    </PageContainer>
  );
}

export default AppContent;
