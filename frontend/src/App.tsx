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


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이 설정 */
`;

function App() {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>
          <PageContainer>
            <Header />
            <Routes>
              {/* Route는 반드시 Routes로 감싸야 합니다 */}
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
                <Route
                    path="/undergraduate/admission-scholarship"
                    element={<Hyperlink />}
                />
            </Routes>
            <Footer />
            <Modal />
          </PageContainer>
        </AuthProvider>
      </ModalProvider>
    </Router>
  );
}

export default App;
