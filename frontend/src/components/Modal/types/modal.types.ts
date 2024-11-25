import React, { ReactNode } from 'react';

// 기본 모달 Props 타입
export interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

// 서브 컴포넌트들의 공통 Props 타입
export interface ModalSubComponentProps {
  children: ReactNode;
  className?: string;
}

// 닫기 버튼 Props 타입
export interface ModalCloseButtonProps {
  onClick?: () => void;
  className?: string;
}

// 모달 컨텍스트 타입
export interface ModalContextType {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}

// Alert 모달 타입들
export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: AlertType;
}

// Confirm 모달 타입들
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

// Form Error 모달 타입들
export interface FormErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

// 모달 상태 타입들
export interface AlertModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: AlertType;
}

export interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => Promise<void>) | null;
  isLoading: boolean;
}

export interface FormErrorModalState {
  isOpen: boolean;
  message: string;
}

// useModal 훅 반환 타입
export type UseModalReturn = ModalContextType;

// useNoticeModals 훅 반환 타입
export interface UseNoticeModalsReturn {
  alertModal: AlertModalState;
  confirmModal: ConfirmModalState;
  formErrorModal: FormErrorModalState;
  showAlert: (title: string, message: string, type?: AlertType) => void;
  showConfirm: (
    title: string,
    message: string,
    onConfirm: () => Promise<void>,
  ) => void;
  showFormError: (message: string) => void;
  closeAlert: () => void;
  closeConfirm: () => void;
  closeFormError: () => void;
  setConfirmLoading: (isLoading: boolean) => void;
}
