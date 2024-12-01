import React from 'react';
import styled from 'styled-components';
import { Modal } from '../index';
import { AlertTriangle, CheckCircle } from 'lucide-react';

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Message = styled.p`
  color: #4b5563;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const BaseButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #3b82f6;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

const GhostButton = styled(BaseButton)`
  background-color: transparent;
  color: #4b5563;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
  }
`;

const DangerButton = styled(BaseButton)`
  background-color: #ef4444;
  color: white;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }
`;

// Alert Modal Component
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <HeaderContainer>
          {type === 'success' ? (
            <CheckCircle size={24} color="#10B981" />
          ) : (
            <AlertTriangle size={24} color="#EF4444" />
          )}
          <HeaderTitle>{title}</HeaderTitle>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Content>
        <Message>{message}</Message>
      </Modal.Content>
      <Modal.Footer>
        <PrimaryButton onClick={onClose}>확인</PrimaryButton>
      </Modal.Footer>
    </Modal>
  );
}

// Confirm Modal Component
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <HeaderContainer>
          <AlertTriangle size={24} color="#F59E0B" />
          <HeaderTitle>{title}</HeaderTitle>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Content>
        <Message>{message}</Message>
      </Modal.Content>
      <Modal.Footer>
        <ButtonsContainer>
          <GhostButton onClick={onClose} disabled={isLoading}>
            {cancelText}
          </GhostButton>
          <DangerButton onClick={onConfirm} disabled={isLoading}>
            {isLoading ? '처리중...' : confirmText}
          </DangerButton>
        </ButtonsContainer>
      </Modal.Footer>
    </Modal>
  );
}

// Form Error Modal Component
interface FormErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function FormErrorModal({
  isOpen,
  onClose,
  message,
}: FormErrorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <HeaderContainer>
          <AlertTriangle size={24} color="#EF4444" />
          <HeaderTitle>입력 오류</HeaderTitle>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Content>
        <Message>{message}</Message>
      </Modal.Content>
      <Modal.Footer>
        <PrimaryButton onClick={onClose}>확인</PrimaryButton>
      </Modal.Footer>
    </Modal>
  );
}
