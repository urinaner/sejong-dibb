import React, { useEffect } from 'react';
import {
  ModalWrapper,
  ModalContent,
  CloseButton,
} from '../../styles/ModalStyle';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 모달이 열리면 스크롤 막기
    } else {
      document.body.style.overflow = 'auto'; // 모달이 닫히면 스크롤 복원
    }

    return () => {
      document.body.style.overflow = 'auto'; // 언마운트 시 스크롤 복원
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
      <ModalWrapper isModalOpen={isOpen}>
        <ModalContent>
          {children}
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContent>
      </ModalWrapper>
  );
}

export default Modal;
