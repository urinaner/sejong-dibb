import React from 'react';
import { Modal } from '../index';
import Button from '../../../common/Button/Button';
import { AlertTriangle, CheckCircle } from 'lucide-react';

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
        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-red-500" />
          )}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </Modal.Header>
      <Modal.Content>
        <p className="text-gray-600">{message}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

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
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </Modal.Header>
      <Modal.Content>
        <p className="text-gray-600">{message}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? '처리중...' : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

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
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold">입력 오류</h2>
        </div>
      </Modal.Header>
      <Modal.Content>
        <p className="text-gray-600">{message}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
