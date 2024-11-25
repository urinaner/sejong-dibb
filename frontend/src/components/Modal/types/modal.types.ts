export interface ModalRootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export interface ModalSubComponentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalCloseButtonProps {
  onClick: () => void;
  className?: string;
}

export interface ModalContextType {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  content: React.ReactNode | null;
}
