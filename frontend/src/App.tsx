import React from 'react';
import styled from 'styled-components';

// 테스트용 스타일링된 컴포넌트 생성
const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
`;

function App() {
  return (
    <>
      <div className="App">초기 세팅</div>
      <Button>클릭하세요</Button>
    </>
  );
}

export default App;
