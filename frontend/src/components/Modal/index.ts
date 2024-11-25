// components/Modal/index.ts
import { ModalRoot } from './components/ModalRoot';
import { ModalHeader } from './components/ModalHeader';
import { ModalContent } from './components/ModalContent';
import { ModalFooter } from './components/ModalFooter';
import { ModalCloseButton } from './components/ModalCloseButton';
import { ModalProvider } from './context/ModalContext';
import { useModal } from './hooks/useModal';

// 합성 컴포넌트 구성
const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  CloseButton: ModalCloseButton,
  Provider: ModalProvider,
});

// 외부에서 사용할 수 있도록 내보내기
export { Modal, useModal };

// TypeScript 타입 내보내기
export type {
  ModalRootProps,
  ModalSubComponentProps,
  ModalCloseButtonProps,
  ModalContextType,
} from './types/modal.types';
