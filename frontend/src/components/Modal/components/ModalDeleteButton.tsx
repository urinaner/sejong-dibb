import React from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';
import { Modal, useModal } from '../';
import type { DeleteButtonProps } from '../types/modal.types';

const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
`;

const ModalMessage = styled.p`
  color: #4a5568;
  text-align: center;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #e2e8f0;
  color: #4a5568;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const StyledDeleteButton = styled.button<{ isDeleting?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: ${({ isDeleting }) => (isDeleting ? '#feb2b2' : '#e53e3e')};
  color: white;
  transition: background-color 0.2s;
  cursor: ${({ isDeleting }) => (isDeleting ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background-color: #c53030;
  }

  &:disabled {
    background-color: #feb2b2;
    cursor: not-allowed;
  }
`;

export const ModalDeleteButton: React.FC<DeleteButtonProps> = ({
  title = '삭제 확인',
  message = '정말 삭제하시겠습니까?',
  submessage = '이 작업은 취소할 수 없습니다.',
  onDelete,
  isDeleting = false,
  children,
  className,
}) => {
  const { openModal, closeModal } = useModal();

  const handleDelete = async () => {
    try {
      await onDelete();
      closeModal();
    } catch (error) {
      console.error('Delete operation failed:', error);
    }
  };

  const handleDeleteClick = () => {
    openModal(
      <>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <DeleteModalContent>
            <AlertTriangle size={48} color="#E53E3E" />
            <ModalTitle>{message}</ModalTitle>
            {submessage && <ModalMessage>{submessage}</ModalMessage>}
          </DeleteModalContent>
        </Modal.Content>
        <Modal.Footer>
          <ModalButtonGroup>
            <CancelButton onClick={() => closeModal()}>취소</CancelButton>
            <StyledDeleteButton
              onClick={handleDelete}
              disabled={isDeleting}
              isDeleting={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </StyledDeleteButton>
          </ModalButtonGroup>
        </Modal.Footer>
      </>,
    );
  };

  return (
    <StyledDeleteButton
      onClick={handleDeleteClick}
      className={className}
      disabled={isDeleting}
      isDeleting={isDeleting}
    >
      {children}
    </StyledDeleteButton>
  );
};
