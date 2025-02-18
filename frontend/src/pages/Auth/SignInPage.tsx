import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../components/Modal';
import { Modal } from '../../components/Modal';
import { TermsModal } from '../../components/Modal/templates/TermsModal';
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
  const modal = useModal();
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [termsModal, setTermsModal] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy' | 'collection';
  }>({
    isOpen: false,
    type: 'terms',
  });

  if (!context) {
    throw new Error('Auth context is undefined');
  }

  const { signin, error, clearError } = context;

  const handleOpenTerms = (type: 'terms' | 'privacy' | 'collection') => {
    setTermsModal({
      isOpen: true,
      type,
    });
  };

  const handleCloseTerms = () => {
    setTermsModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const showAlertModal = (title: string, message: string) => {
    modal.openModal(
      <>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton onClick={modal.closeModal}>확인</Modal.CloseButton>
        </Modal.Footer>
      </>,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isSubmitting) return;

    if (!privacyAgreed) {
      showAlertModal('알림', '개인정보 수집 및 이용에 동의해주세요.');
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

      navigate('/');
      showAlertModal(
        '로그인 성공',
        `${isAdminLogin ? '관리자' : '학생'} 계정으로 로그인되었습니다.`,
      );
    } catch (err) {
      console.error('Login failed:', err);
      showAlertModal(
        '로그인 실패',
        '로그인에 실패했습니다. 다시 시도해주세요.',
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

        <Form onSubmit={handleSubmit}>
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
              <button
                type="button"
                onClick={() => handleOpenTerms('collection')}
              >
                개인정보 수집 및 이용
              </button>
              에 동의합니다.
              <br />
              <button type="button" onClick={() => handleOpenTerms('terms')}>
                이용약관
              </button>{' '}
              및{' '}
              <button type="button" onClick={() => handleOpenTerms('privacy')}>
                개인정보처리방침
              </button>{' '}
              보기
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

      <TermsModal
        type={termsModal.type}
        isOpen={termsModal.isOpen}
        onClose={handleCloseTerms}
      />
    </Container>
  );
};

export default SignInPage;
