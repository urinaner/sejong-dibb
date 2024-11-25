// components/Modal/templates/AlertModal.tsx
import React from 'react';
import { AlertModalProps } from '../types/modal.types';
import { Modal } from '../Modal';
import {
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
} from '../styles/ModalStyles';

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalContent>{message}</ModalContent>
      <ModalFooter>
        <Button onClick={onClose}>확인</Button>
      </ModalFooter>
    </Modal>
  );
};
