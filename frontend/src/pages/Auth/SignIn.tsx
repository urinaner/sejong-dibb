import React, { useState } from 'react';
import {
  Container,
  Form,
  Title,
  Input,
  Button,
  ActionButtons,
  LinkButton,
} from '../../styles/SignInStyle';
import axios, { AxiosResponse } from 'axios';
import Modal from '../../components/Modal/Modal';
import useModal from '../../components/Modal/useModal';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

const SignIn: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal(); // useModal 훅 사용
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { id: id, pw: password };
    console.log('Login with:', id, password);

    try {
      const response: AxiosResponse<LoginResponse> =
        await axios.post<LoginResponse>('/api/admin/signin', loginData);

      // 응답 데이터 처리
      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        setModalMessage('로그인 성공!'); // 성공 메시지 설정
        openModal(); // 모달 열기
      } else {
        console.error('로그인 실패: 잘못된 응답 상태 코드', response.status);
        setModalMessage('로그인 실패: 잘못된 응답 상태 코드'); // 실패 메시지 설정
        openModal(); // 모달 열기
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('로그인 실패: 서버 오류', error.response?.data);
        setModalMessage('로그인 실패: 서버 오류 발생'); // 서버 오류 메시지 설정
        openModal(); // 모달 열기
      } else {
        console.error('로그인 실패: 네트워크 오류 또는 기타 문제', error);
        setModalMessage('로그인 실패: 네트워크 오류 발생'); // 네트워크 오류 메시지 설정
        openModal(); // 모달 열기
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
          value={id}
          onChange={(e) => setId(e.target.value)}
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

      {/* 모달은 isModalOpen 상태에 따라 렌더링 */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalMessage} {/* 모달 메시지 출력 */}
        </Modal>
      )}
    </Container>
  );
};

export default SignIn;
