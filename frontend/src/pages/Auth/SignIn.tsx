import React, { useState, useContext } from 'react';
import {
  Container,
  Form,
  Title,
  Input,
  Button,
  ActionButtons,
  LinkButton,
} from '../../styles/SignInStyle';
import { AuthContext } from '../../context/AuthContext';
import { AxiosError } from 'axios';
import { useModalContext } from '../../context/ModalContext';

const SignIn: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { openModal } = useModalContext();

  if (!authContext) {
    throw new Error('AuthContext가 정의되지 않았습니다.');
  }

  const { signin, isAuthenticated } = authContext;

  const [loginId, setLoginId] = useState(''); // loginId로 변경
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId || !password) {
      // loginId 확인
      openModal(
        <div>
          <h2>입력 오류</h2>
          <p>아이디와 비밀번호를 모두 입력해주세요.</p>
        </div>,
      );
      return;
    }

    try {
      console.log('로그인 시도 중...', { loginId, password });
      await signin(loginId, password); // loginId로 전송

      openModal(
        <div>
          <h2>로그인 성공</h2>
          <p>환영합니다! 로그인에 성공했습니다.</p>
        </div>,
      );
    } catch (error: any) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || '서버 오류가 발생했습니다.'
          : '네트워크 오류가 발생했습니다.';

      openModal(
        <div>
          <h2>로그인 실패</h2>
          <p>
            {typeof errorMessage === 'string'
              ? errorMessage
              : '알 수 없는 오류입니다.'}
          </p>
        </div>,
      );
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>관리자 로그인</Title>
        <Input
          type="text"
          placeholder="ID"
          value={loginId} // loginId 상태 사용
          onChange={(e) => setLoginId(e.target.value)} // loginId 상태 변경 함수
        />
        <Input
          type="password"
          placeholder="PW"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
        <ActionButtons>
          <LinkButton>아이디/비밀번호 찾기</LinkButton>
          <LinkButton>회원가입</LinkButton>
        </ActionButtons>
      </Form>
    </Container>
  );
};

export default SignIn;
