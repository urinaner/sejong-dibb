import styled from 'styled-components';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index/Index';
import Footer from './components/Footer/Footer';
import SignIn from './pages/Auth/SignIn';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import Modal from './components/Modal/Modal';

import Hyperlink from './pages/Undergraduate/Hyperlink';
import Overview from './pages/About/About';
import Faculty from './pages/About/Faculty';
import mainImage from './assets/images/main_picture.svg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이 설정 */
`;

const ContentWrapper = styled.main`
  flex-grow: 1; /* 남은 공간을 채우도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const MainImage = styled.img`
  width: 100vw; /* 전체 화면 너비 */
  height: 100vh; /* 전체 화면 높이 */
  object-fit: cover; /* 이미지 비율을 유지하며 화면을 덮도록 설정 */
  //position: absolute; /* 다른 콘텐츠 위에 위치하도록 설정 */
  top: 0;
  left: 0;
  z-index: -1; /* 이미지가 다른 콘텐츠 뒤로 가도록 설정 */
`;

function App() {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>
          <PageContainer>
            <Header />
            <MainImage src={mainImage} alt="Main Visual" />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/undergraduate/admission-scholarship"
                  element={<Hyperlink />}
                />
                <Route path="/about" element={<Overview />} />
                <Route path="/about/faculty" element={<Faculty />} />
              </Routes>
            </ContentWrapper>
            <Footer />
            <Modal />
          </PageContainer>
        </AuthProvider>
      </ModalProvider>
    </Router>
  );
}

export default App;
