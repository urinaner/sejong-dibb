import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. 모달 상태를 관리하는 Context 생성
interface ModalContextType {
  isModalOpen: boolean;
  openModal: (content: React.ReactNode) => void; // 콘텐츠를 받을 수 있도록 수정
  closeModal: () => void;
  modalContent: React.ReactNode | null; // 모달에 표시할 콘텐츠 관리
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 2. 모달 상태를 제공하는 Provider 컴포넌트
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  ); // 모달 콘텐츠 상태

  const openModal = (content: React.ReactNode) => {
    setModalContent(content); // 모달에 표시할 콘텐츠 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null); // 모달이 닫힐 때 콘텐츠 초기화
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// 3. 모달 상태를 가져오는 훅
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
