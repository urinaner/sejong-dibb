import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/apiConfig';
import { Modal } from '../../../components/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 460px;
  text-align: center;
  margin-top: 64px;
`;

const LogoContainer = styled.div`
  margin-bottom: 2.5rem;

  img {
    width: 140px;
    height: auto;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => (props.disabled ? '#e2e8f0' : '#c02327')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #b01e22;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 4px;
  padding: 0.875rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

const PasswordRequirements = styled.ul`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  text-align: left;

  li {
    margin-bottom: 0.25rem;
    line-height: 1.4;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

const VerifyButton = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.75rem;
`;

const NewPasswordSection = styled.div<{ verified: boolean }>`
  opacity: ${(props) => (props.verified ? '1' : '0.5')};
  pointer-events: ${(props) => (props.verified ? 'all' : 'none')};
  transition: opacity 0.3s ease;
`;

const VerifyMessage = styled.div<{ isSuccess: boolean }>`
  color: ${(props) => (props.isSuccess ? '#2f855a' : '#e53e3e')};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => (props.isSuccess ? '#2f855a' : '#e53e3e')};
  }
`;

function ChangeAdminPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState<{
    text: string;
    success: boolean;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const navigate = useNavigate();

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const handleVerifyPassword = async () => {
    if (!currentPassword || isVerifying) return;

    setIsVerifying(true);
    setVerifyMessage(null);

    try {
      const response = await axiosInstance.post('/api/admin/verify-password', {
        currentPassword,
      });

      if (response.status === 200) {
        setIsVerified(true);
        setVerifyMessage({ text: '비밀번호가 확인되었습니다.', success: true });
      }
    } catch (err: any) {
      setVerifyMessage({
        text: '현재 비밀번호가 올바르지 않습니다.',
        success: false,
      });
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSubmitting || !isVerified) return;

    if (!newPassword || !confirmPassword) {
      openModal(
        <>
          <Modal.Header>입력 오류</Modal.Header>
          <Modal.Content>
            <p>새 비밀번호를 모두 입력해주세요.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeModal}>확인</Button>
          </Modal.Footer>
        </>,
      );
      return;
    }

    if (!validatePassword(newPassword)) {
      openModal(
        <>
          <Modal.Header>비밀번호 형식 오류</Modal.Header>
          <Modal.Content>
            <p>새 비밀번호가 요구사항을 충족하지 않습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeModal}>확인</Button>
          </Modal.Footer>
        </>,
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      openModal(
        <>
          <Modal.Header>비밀번호 불일치</Modal.Header>
          <Modal.Content>
            <p>새 비밀번호가 일치하지 않습니다.</p>
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
      await axiosInstance.post('/api/admin/change-password', {
        currentPassword,
        newPassword,
      });

      openModal(
        <>
          <Modal.Header>성공</Modal.Header>
          <Modal.Content>
            <p>비밀번호가 성공적으로 변경되었습니다.</p>
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
    } catch (err: any) {
      if (err.response?.status === 401) {
        openModal(
          <>
            <Modal.Header>인증 오류</Modal.Header>
            <Modal.Content>
              <p>현재 비밀번호가 올바르지 않습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Button onClick={closeModal}>확인</Button>
            </Modal.Footer>
          </>,
        );
      } else {
        openModal(
          <>
            <Modal.Header>오류</Modal.Header>
            <Modal.Content>
              <p>비밀번호 변경 중 오류가 발생했습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Button onClick={closeModal}>확인</Button>
            </Modal.Footer>
          </>,
        );
      }
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

        <Title>관리자 비밀번호 변경</Title>
        <SubTitle>
          먼저 현재 비밀번호를 확인한 후, 새로운 비밀번호를 설정해주세요.
        </SubTitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputWrapper>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setIsVerified(false);
                setVerifyMessage(null);
              }}
              placeholder="현재 비밀번호를 입력하세요"
              disabled={isVerifying || isVerified}
            />
            <VerifyButton
              type="button"
              onClick={handleVerifyPassword}
              disabled={!currentPassword || isVerifying || isVerified}
            >
              {isVerifying ? '확인 중...' : '비밀번호 확인'}
            </VerifyButton>
            {verifyMessage && (
              <VerifyMessage isSuccess={verifyMessage.success}>
                {verifyMessage.text}
              </VerifyMessage>
            )}
          </InputWrapper>

          <NewPasswordSection verified={isVerified}>
            <InputWrapper>
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                disabled={!isVerified || isSubmitting}
              />
              <PasswordRequirements>
                <li>8자 이상의 길이</li>
                <li>영문 대문자 1자 이상 포함</li>
                <li>영문 소문자 1자 이상 포함</li>
                <li>숫자 1자 이상 포함</li>
                <li>특수문자 1자 이상 포함</li>
              </PasswordRequirements>
            </InputWrapper>

            <InputWrapper>
              <Label>새 비밀번호 확인</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
                disabled={!isVerified || isSubmitting}
              />
            </InputWrapper>

            <Button
              type="submit"
              disabled={
                !isVerified || isSubmitting || !newPassword || !confirmPassword
              }
            >
              {isSubmitting ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </NewPasswordSection>
        </Form>

        <Footer>© Sejong University. All rights reserved.</Footer>
      </ContentWrapper>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </Container>
  );
}

export default ChangeAdminPassword;
