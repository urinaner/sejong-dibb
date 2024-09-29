import styled from 'styled-components';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index/Index';
import Footer from './components/Footer/Footer';
import SignIn from './pages/Auth/SignIn';
import Modal from './components/Modal/Modal';
import { useState, useEffect } from 'react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이 설정 */
`;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // 모달이 열리면 스크롤 막음
    } else {
      document.body.style.overflow = 'auto'; // 모달이 닫히면 스크롤 복원
    }

    // 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

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
