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
import { useModalContext } from '../../context/ModalContext'; // 모달 컨텍스트 가져오기

const SignIn: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { openModal, closeModal } = useModalContext(); // 모달 컨텍스트 사용

  if (!authContext) {
    // AuthContext가 없을 경우에 대한 처리 (null 또는 undefined)
    throw new Error('AuthContext가 정의되지 않았습니다.');
  }

  const { signin, isAuthenticated } = authContext; // 정확한 signin 및 isAuthenticated 사용

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('try to login');

      await signin(userName, password);
      openModal(
        <div>
          <h2>로그인 성공</h2>
          <p>환영합니다! 로그인에 성공했습니다.</p>
        </div>,
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        openModal(
          <div>
            <h2>로그인 실패</h2>
            <p>{error.response?.data || '서버 오류가 발생했습니다.'}</p>
          </div>,
        );
      } else {
        openModal(
          <div>
            <h2>로그인 실패</h2>
            <p>네트워크 오류가 발생했습니다.</p>
          </div>,
        );
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>관리자 로그인</Title>
        <Input
          type="text"
          placeholder="ID"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
