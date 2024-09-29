import styled from 'styled-components';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index/Index';
import Footer from './components/Footer/Footer';
import SignIn from './pages/Auth/SignIn';
import Modal from './components/Modal/Modal';
import useModal from './components/Modal/useModal';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이 설정 */
`;

function App() {
  const { isModalOpen, openModal, closeModal } = useModal(); // 커스텀 훅 사용

  return (
    <Router>
      <PageContainer>
        <Header />
        <Routes>
          {' '}
          {/* Route는 반드시 Routes로 감싸야 합니다 */}
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </PageContainer>
      <button onClick={openModal}>모달 버튼</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        모달 내용을 입력하세요.
      </Modal>
    </Router>
  );
}

export default App;
