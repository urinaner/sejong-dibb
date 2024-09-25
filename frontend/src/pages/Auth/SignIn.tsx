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
import axios from 'axios';

interface LoginResponse {
  token: string;
  exprisesIn: number;
}

const SignIn: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with:', id, password);
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
