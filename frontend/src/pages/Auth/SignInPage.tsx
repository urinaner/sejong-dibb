import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../components/Modal';
import { Modal } from '../../components/Modal';
import { TermsModal } from '../../components/Modal/templates/TermsModal';
import * as S from './SignInPageStyle';

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
    <S.PageWrapper>
      <S.LoginContainer>
        <S.ContentWrapper>
          <S.LogoContainer>
            <img src="/sejong-icon.svg" alt="세종대학교 로고" />
          </S.LogoContainer>

          <S.Title>
            세종대학교 <br />
            바이오융합공학전공
          </S.Title>
          <S.SubTitle>
            세종대학교 포털과 동일한 학번 및 비밀번호를 사용하여 로그인
          </S.SubTitle>

          <S.Form onSubmit={handleSubmit}>
            <S.Tabs>
              <S.Tab
                type="button"
                active={activeTab === 'student'}
                onClick={() => setActiveTab('student')}
              >
                학생 로그인
              </S.Tab>
              <S.Tab
                type="button"
                active={activeTab === 'admin'}
                onClick={() => setActiveTab('admin')}
              >
                관리자 로그인
              </S.Tab>
            </S.Tabs>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.InputWrapper>
              <S.Label>{activeTab === 'admin' ? '아이디' : '학번'}</S.Label>
              <S.Input
                type="text"
                placeholder={activeTab === 'admin' ? '아이디' : '학번'}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                disabled={isSubmitting}
              />
            </S.InputWrapper>

            <S.InputWrapper>
              <S.Label>비밀번호</S.Label>
              <S.Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </S.InputWrapper>

            <S.PrivacyWrapper>
              <S.Checkbox
                type="checkbox"
                id="privacy-agreement"
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                disabled={isSubmitting}
              />
              <S.PrivacyLabel htmlFor="privacy-agreement">
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
                <button
                  type="button"
                  onClick={() => handleOpenTerms('privacy')}
                >
                  개인정보처리방침
                </button>{' '}
                보기
              </S.PrivacyLabel>
            </S.PrivacyWrapper>

            <S.Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </S.Button>

            <S.HelpLinks>
              {activeTab === 'student' ? (
                <S.HelpLink
                  href="#"
                  onClick={() =>
                    window.open(
                      'https://portal.sejong.ac.kr/jsp/inquiry/nmconf.jsp',
                    )
                  }
                >
                  아이디/비밀번호 찾기
                </S.HelpLink>
              ) : (
                <S.HelpLink
                  href="#"
                  onClick={() =>
                    window.open('https://portal.sejong.ac.kr', '_blank')
                  }
                >
                  포털 바로가기
                </S.HelpLink>
              )}
            </S.HelpLinks>
          </S.Form>

          <S.Footer>© Sejong University. All rights reserved.</S.Footer>
        </S.ContentWrapper>
      </S.LoginContainer>

      <TermsModal
        type={termsModal.type}
        isOpen={termsModal.isOpen}
        onClose={handleCloseTerms}
      />
    </S.PageWrapper>
  );
};

export default SignInPage;
