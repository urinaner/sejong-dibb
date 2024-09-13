import React from 'react';
import * as S from './styles/style';

function App() {
  return (
    <>
      <div className="App">초기 세팅</div>
      <S.Button>스타일드 컴포넌트 테스트</S.Button>
      <S.Button primary>기본 버튼</S.Button>
    </>
  );
}

export default App;
