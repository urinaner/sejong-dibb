import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);  // 모달에 표시될 내용을 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);  // 모달이 닫힐 때 내용을 초기화
  };

  const ModalComponent = () => (
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
  );

  return {
    isModalOpen,
    openModal,
    closeModal,
    ModalComponent,
  };
}

export default useModal;
