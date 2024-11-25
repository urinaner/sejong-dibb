import { ModalRoot } from './components/ModalRoot';
import { ModalHeader } from './components/ModalHeader';
import { ModalContent } from './components/ModalContent';
import { ModalFooter } from './components/ModalFooter';
import { ModalCloseButton } from './components/ModalCloseButton';
import { ModalProvider } from './context/ModalContext';
import { useModal } from './hooks/useModal';

// 모달 컴포넌트 합성
const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  CloseButton: ModalCloseButton,
  Provider: ModalProvider,
});

// 컴포넌트 및 훅 내보내기
export { Modal, useModal };

// 타입 정의 내보내기
export type {
  ModalRootProps,
  ModalSubComponentProps,
  ModalCloseButtonProps,
  ModalContextType,
  AlertModalProps,
  ConfirmModalProps,
  FormErrorModalProps,
  UseModalReturn,
  UseNoticeModalsReturn,
  AlertType,
} from './types/modal.types';
