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
import Faculty from './pages/About/Faculty';
import NoticeBoard from './pages/News/NoticeBoard/NoticeBoard';
import mainImage from './assets/images/main_picture.svg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const ContentWrapper = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const MainImage = styled.img<{ isHomePage: boolean }>`
  width: 100%;
  height: ${(props) => (props.isHomePage ? '60vh' : '30vh')};
  object-fit: cover;
  margin-bottom: ${(props) => (props.isHomePage ? '40px' : '20px')};
  transition: height 0.3s ease;
`;

const MainImageWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 60px;
`;

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <PageContainer>
      <Header />
      <MainImageWrapper>
        <MainImage src={mainImage} alt="Main Visual" isHomePage={isHomePage} />
      </MainImageWrapper>
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/undergraduate/admission-scholarship"
            element={<Hyperlink />}
          />
          <Route path="/about" element={<Overview />} />
          <Route path="/about/faculty" element={<Faculty />} />
          <Route path="/news/noticeboard" element={<NoticeBoard />} />
        </Routes>
      </ContentWrapper>
      <Footer />
      <Modal />
    </PageContainer>
  );
}

export default AppContent;
