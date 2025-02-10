import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../../components/Modal';
import {
  Container,
  ContentWrapper,
  LogoContainer,
  Title,
  SubTitle,
  Form,
  InputWrapper,
  Label,
  Input,
  Button,
  Footer,
  HelpLinks,
  HelpLink,
  ErrorMessage,
  Tabs,
  Tab,
  PrivacyLabel,
  Checkbox,
  PrivacyWrapper,
} from './SignInPageStyle';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

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

    if (!privacyAgreed) {
      openModal(
        <>
          <Modal.Header>알림</Modal.Header>
          <Modal.Content>
            <p>개인정보 수집 및 이용에 동의해주세요.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeModal}>확인</Button>
          </Modal.Footer>
        </>,
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const isAdminLogin = activeTab === 'admin';
      let loginData;

      if (isAdminLogin) {
        loginData = new FormData();
        loginData.append('loginId', loginId);
        loginData.append('password', password);
      } else {
        loginData = {
          loginId,
          password,
        };
      }

      await signin(loginData, isAdminLogin);

      // 로그인 성공 시에만 모달을 표시하고 홈으로 이동
      navigate('/');
      openModal(
        <>
          <Modal.Header>로그인 성공</Modal.Header>
          <Modal.Content>
            <p>{isAdminLogin ? '관리자' : '학생'} 계정으로 로그인되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeModal}>확인</Button>
          </Modal.Footer>
        </>,
      );
    } catch (err) {
      console.error('Login failed:', err);
      // 로그인 실패 시 모달만 표시
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
    <Container>
      <ContentWrapper>
        <LogoContainer>
          <img src="/sejong-icon.svg" alt="세종대학교 로고" />
        </LogoContainer>

        <Title>
          세종대학교 <br />
          바이오융합공학전공
        </Title>
        <SubTitle>
          세종대학교 포털과 동일한 학번 및 비밀번호를 사용하여 로그인
        </SubTitle>

        <Form as="form" onSubmit={handleSubmit}>
          <Tabs>
            <Tab
              type="button"
              active={activeTab === 'student'}
              onClick={() => setActiveTab('student')}
            >
              학생 로그인
            </Tab>
            <Tab
              type="button"
              active={activeTab === 'admin'}
              onClick={() => setActiveTab('admin')}
            >
              관리자 로그인
            </Tab>
          </Tabs>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputWrapper>
            <Label>{activeTab === 'admin' ? '아이디' : '학번'}</Label>
            <Input
              type="text"
              placeholder={activeTab === 'admin' ? '아이디' : '학번'}
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              disabled={isSubmitting}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </InputWrapper>

          <PrivacyWrapper>
            <Checkbox
              type="checkbox"
              id="privacy-agreement"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              disabled={isSubmitting}
            />
            <PrivacyLabel htmlFor="privacy-agreement">
              개인정보 수집 및 이용에 동의합니다.
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/privacy-policy');
                }}
              >
                약관보기
              </a>
            </PrivacyLabel>
          </PrivacyWrapper>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>

          <HelpLinks>
            {activeTab === 'student' ? (
              <HelpLink
                href="#"
                onClick={() =>
                  window.open(
                    'https://portal.sejong.ac.kr/jsp/inquiry/nmconf.jsp',
                  )
                }
              >
                아이디/비밀번호 찾기
              </HelpLink>
            ) : (
              <HelpLink
                href="#"
                onClick={() =>
                  window.open('https://portal.sejong.ac.kr', '_blank')
                }
              >
                포털 바로가기
              </HelpLink>
            )}
          </HelpLinks>
        </Form>

        <Footer>© Sejong University. All rights reserved.</Footer>
      </ContentWrapper>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </Container>
  );
};

export default SignInPage;
