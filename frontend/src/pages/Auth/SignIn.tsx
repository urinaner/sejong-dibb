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

interface LoginResponse {
  token: string;
  exprisesIn: number;
}

interface LoginRequest {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

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
        alert('로그인 성공!');
        return response.data; // 성공 시 반환
      }

      console.error('로그인 실패: 잘못된 응답 상태 코드', response.status);
      return null; // 실패 시 null 반환
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('로그인 실패: 서버 오류', error.response?.data);
      } else {
        console.error('로그인 실패: 네트워크 오류 또는 기타 문제', error);
      }
      return null; // 실패 시 null 반환
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
    </Container>
  );
};

export default SignIn;
