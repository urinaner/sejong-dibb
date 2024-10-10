import styled from 'styled-components';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index/Index';
import Footer from './components/Footer/Footer';
import SignIn from './pages/Auth/SignIn';
import { AuthProvider } from './context/AuthContext';
import Hyperlink from './pages/Undergraduate/Hyperlink';
import { ModalProvider } from './context/ModalContext';
import Modal from './components/Modal/Modal';

import Overview from './pages/About/About';
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
  width: 100%;
  max-width: 1440px;
  height: auto;
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
