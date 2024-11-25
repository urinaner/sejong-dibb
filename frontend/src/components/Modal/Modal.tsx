import { ModalRoot } from './components/ModalRoot';
import { ModalHeader } from './components/ModalHeader';
import { ModalContent } from './components/ModalContent';
import { ModalFooter } from './components/ModalFooter';
import { ModalCloseButton } from './components/ModalCloseButton';

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  CloseButton: ModalCloseButton,
});
