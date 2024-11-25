import { ModalRoot } from './components/ModalRoot';
import { ModalHeader } from './components/ModalHeader';
import { ModalContent } from './components/ModalContent';
import { ModalFooter } from './components/ModalFooter';
import { ModalCloseButton } from './components/ModalCloseButton';
import { ModalDeleteButton } from './components/ModalDeleteButton';
import { useModal } from './hooks/useModal';

// 모달 컴포넌트 합성
const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  CloseButton: ModalCloseButton,
  DeleteButton: ModalDeleteButton,
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
  DeleteButtonProps,
  UseModalReturn,
  UseNoticeModalsReturn,
  AlertType,
} from './types/modal.types';
