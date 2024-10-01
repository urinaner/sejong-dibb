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
import Modal from '../../components/Modal/Modal';
import useModal from '../../components/Modal/useModal';
import { AuthContext } from '../../context/AuthContext';
import { AxiosError } from 'axios';

const SignIn: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // AuthContext가 없을 경우에 대한 처리 (null 또는 undefined)
    throw new Error('AuthContext가 정의되지 않았습니다.');
  }

  const { signin, isAuthenticated } = authContext; // 정확한 signin 및 isAuthenticated 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { email: email, pw: password };

    try {
      await signin(loginData.email, loginData.pw);
      setModalMessage('로그인 성공!');
      openModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        setModalMessage(
          `로그인 실패: ${error.response?.data || '서버 오류 발생'}`,
        );
        openModal();
      } else {
        setModalMessage('로그인 실패: 네트워크 오류 발생');
        openModal();
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>관리자 로그인</Title>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
        <ActionButtons>
          <LinkButton>아이디/비밀번호 찾기</LinkButton>
          <LinkButton>회원가입</LinkButton>
        </ActionButtons>
      </Form>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalMessage}
        </Modal>
      )}
    </Container>
  );
};

export default SignIn;
