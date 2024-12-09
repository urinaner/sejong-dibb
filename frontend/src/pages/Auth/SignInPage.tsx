import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  LogoContainer,
  DepartmentText,
  Form,
  Input,
  Button,
  ActionButtons,
  LinkButton,
  ErrorMessage,
  Tabs,
  Tab,
} from './SignInPageStyle';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../../components/Modal';

const SignInForm: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!context) {
    throw new Error('Auth context is undefined');
  }

  const { signin, error, clearError } = context;

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await signin(loginId, password, isAdmin);
      openModal(
        <>
          <Modal.Header>로그인 성공</Modal.Header>
          <Modal.Content>
            <p>환영합니다!</p>
            <p>{isAdmin ? '관리자' : '학생'} 계정으로 로그인 되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button
              onClick={() => {
                closeModal();
                navigate('/');
              }}
            >
              확인
            </Button>
          </Modal.Footer>
        </>,
      );
    } catch (err) {
      console.error('Login failed:', err);
      openModal(
        <>
          <Modal.Header>로그인 실패</Modal.Header>
          <Modal.Content>
            <p>로그인에 실패했습니다. 다시 시도해주세요.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeModal}>확인</Button>
          </Modal.Footer>
        </>,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {!isAdmin && (
          <LinkButton
            type="button"
            onClick={() => navigate('/signup')}
            disabled={isSubmitting}
          >
            회원가입
          </LinkButton>
        )}
      </ActionButtons>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </form>
  );
};

const SignInPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  return (
    <Container>
      <LogoContainer>
        <img src="/sejong-icon.svg" alt="세종대학교 로고" />
        <DepartmentText>세종대학교 바이오융합공학전공</DepartmentText>
      </LogoContainer>

      <Form>
        <Tabs>
          <Tab
            active={activeTab === 'student'}
            onClick={() => setActiveTab('student')}
            type="button"
          >
            학생 로그인
          </Tab>
          <Tab
            active={activeTab === 'admin'}
            onClick={() => setActiveTab('admin')}
            type="button"
          >
            관리자 로그인
          </Tab>
        </Tabs>
        <SignInForm isAdmin={activeTab === 'admin'} />
      </Form>
    </Container>
  );
};

export default SignInPage;
