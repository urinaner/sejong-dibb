import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/apiConfig';
import { Modal } from '../../../components/Modal';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #5d5a88;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #e53e3e;
  margin-top: 4px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.disabled ? '#ddd' : '#5d5a88')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ddd' : '#4a4870')};
  }
`;

const PasswordRequirements = styled.ul`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  padding-left: 20px;

  li {
    margin-bottom: 4px;
  }
`;

function ChangeAdminPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (isSubmitting) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      openModal(
        <>
          <Modal.Header>입력 오류</Modal.Header>
          <Modal.Content>
            <p>모든 필드를 입력해주세요.</p>
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
    <PageContainer>
      <Title>관리자 비밀번호 변경</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>현재 비밀번호</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
            disabled={isSubmitting}
          />
        </InputGroup>

        <InputGroup>
          <Label>새 비밀번호</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요"
            disabled={isSubmitting}
          />
          <PasswordRequirements>
            <li>8자 이상</li>
            <li>대문자 포함</li>
            <li>소문자 포함</li>
            <li>숫자 포함</li>
            <li>특수문자 포함</li>
          </PasswordRequirements>
        </InputGroup>

        <InputGroup>
          <Label>새 비밀번호 확인</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
            disabled={isSubmitting}
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button
          type="submit"
          disabled={
            isSubmitting || !currentPassword || !newPassword || !confirmPassword
          }
        >
          {isSubmitting ? '변경 중...' : '비밀번호 변경'}
        </Button>
      </Form>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </PageContainer>
  );
}

export default ChangeAdminPassword;
