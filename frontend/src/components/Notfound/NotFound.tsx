import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './NotFoundStyle';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>페이지를 찾을 수 없습니다</S.Title>
      <S.Message>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </S.Message>
      <S.BackButton onClick={() => navigate('/')}>
        메인으로 돌아가기
      </S.BackButton>
    </S.Container>
  );
};

export default NotFound;
