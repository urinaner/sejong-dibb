import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Form,
  LogoContainer,
  DepartmentText,
  Input,
  Button,
  ErrorMessage,
} from './SignInPageStyle';
import { apiEndpoints } from '../../config/apiConfig';
import { Modal } from '../../components/Modal';

interface SignUpFormData {
  studentId: string;
  name: string;
  major: string;
  phoneN: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    studentId: '',
    name: '',
    major: '바이오융합공학전공',
    phoneN: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.studentId ||
      !formData.name ||
      !formData.phoneN ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (formData.studentId.length !== 8) {
      setError('올바른 학번을 입력해주세요.');
      return false;
    }

    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phoneN)) {
      setError('올바른 전화번호 형식이 아닙니다.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { confirmPassword, ...submitData } = formData;
      await axios.post(apiEndpoints.user.register, submitData);

      openModal(
        <>
          <Modal.Header>회원가입 성공</Modal.Header>
          <Modal.Content>
            <p>회원가입이 완료되었습니다.</p>
            <p>로그인 페이지로 이동합니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button
              onClick={() => {
                closeModal();
                navigate('/signin');
              }}
            >
              확인
            </Button>
          </Modal.Footer>
        </>,
      );
    } catch (err) {
      console.error('Registration failed:', err);
      openModal(
        <>
          <Modal.Header>회원가입 실패</Modal.Header>
          <Modal.Content>
            <p>회원가입에 실패했습니다. 다시 시도해주세요.</p>
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
      <LogoContainer>
        <img src="/sejong-icon.svg" alt="세종대학교 로고" />
        <DepartmentText>세종대학교 바이오융합공학전공</DepartmentText>
      </LogoContainer>

      <Form as="form" onSubmit={handleSubmit}>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: '600',
            color: '#1a1a1a',
          }}
        >
          회원가입
        </h2>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          type="text"
          name="studentId"
          placeholder="학번"
          value={formData.studentId}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Input
          type="tel"
          name="phoneN"
          placeholder="전화번호 (예: 010-1234-5678)"
          value={formData.phoneN}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '처리중...' : '회원가입'}
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/signin')}
          style={{
            backgroundColor: '#6c757d',
            marginBottom: 0,
          }}
        >
          로그인 페이지로 돌아가기
        </Button>
      </Form>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </Container>
  );
};

export default SignUpPage;
