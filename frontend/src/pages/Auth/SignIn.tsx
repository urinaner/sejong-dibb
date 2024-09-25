import React, { useState } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  CheckboxContainer,
  CheckboxLabel,
  Title,
  ActionButtons,
  LinkButton,
} from '../../styles/SignInStyle';

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
        <Title>바이오융합전공 로그인</Title>
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
        <CheckboxContainer>
          <input type="checkbox" />
          <CheckboxLabel>아이디 저장</CheckboxLabel>
        </CheckboxContainer>
        <Button type="submit">로그인</Button>
        <ActionButtons>
          <LinkButton>회원가입</LinkButton>
          <LinkButton>아이디/비밀번호 찾기</LinkButton>
        </ActionButtons>
      </Form>
    </Container>
  );
};

export default SignIn;
