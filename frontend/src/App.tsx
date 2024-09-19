import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 페이지 높이 설정 */
`;

function App() {
  return (
    <>
      <PageContainer>
        <Header />
      </PageContainer>
    </>
  );
}

export default App;
