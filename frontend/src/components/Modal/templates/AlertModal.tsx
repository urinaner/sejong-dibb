import React from 'react';
import { Modal } from '../Modal';
import Button from '../../../common/Button/Button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2 className="text-xl font-semibold">{title}</h2>
      </Modal.Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
