import React from 'react';
import {
  ModalWrapper,
  ModalContent,
  CloseButton,
} from '../../styles/ModalStyle';
import { useModalContext } from '../../context/ModalContext';

const Modal: React.FC = () => {
  const { isModalOpen, closeModal, modalContent } = useModalContext(); // 모달 컨텍스트에서 상태와 콘텐츠 가져오기

  if (!isModalOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <ModalWrapper isModalOpen={isModalOpen}>
      <ModalContent>
        {modalContent} {/* 모달 콘텐츠 렌더링 */}
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
