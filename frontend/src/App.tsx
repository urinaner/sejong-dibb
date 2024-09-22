import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index/Index';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이 설정 */
`;

function App() {
  return (
    <Router>
      <PageContainer>
        <Header />
        <Routes>
          {' '}
          {/* Route는 반드시 Routes로 감싸야 합니다 */}
          <Route path="/" element={<Index />} />
        </Routes>
      </PageContainer>
    </Router>
  );
}

export default App;
