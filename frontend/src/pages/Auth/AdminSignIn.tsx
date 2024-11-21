// AdminSignIn.tsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Title,
  Input,
  Button,
  ActionButtons,
  LinkButton,
  ErrorMessage,
} from './SignInStyle';
import { AuthContext } from '../../context/AuthContext';
import { useModalContext } from '../../context/ModalContext';

const AdminSignIn: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { openModal } = useModalContext();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!context) {
    throw new Error('Auth context is undefined');
  }

  const { signin, isAuthenticated, error, clearError } = context;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (context?.isAuthenticated) {
      navigate('/');
    }
  }, [context?.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await signin(loginId, password, true);

      openModal(
        <div>
          <h2>로그인 성공</h2>
          <p>환영합니다!</p>
        </div>,
      );
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>관리자 로그인</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
        <ActionButtons>
          <LinkButton
            type="button"
            onClick={() => navigate('/find-account')}
            disabled={isSubmitting}
          >
            아이디/비밀번호 찾기
          </LinkButton>
          <LinkButton
            type="button"
            onClick={() => navigate('/signup')}
            disabled={isSubmitting}
          >
            회원가입
          </LinkButton>
        </ActionButtons>
      </Form>
    </Container>
  );
};

export default AdminSignIn;
