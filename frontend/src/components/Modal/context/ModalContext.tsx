import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import type { ModalContextType } from '../types/modal.types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const ModalHeader = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-top: 0.5rem;
`;

const ModalContent = styled.div`
  font-size: 1.25rem;
  color: #4a4a4a;
  line-height: 1.6;
  text-align: center;
  margin: 0.5rem 0;
  word-break: keep-all;
`;

const ModalButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 0.5rem;

  &:hover {
    background-color: #1557b0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  );

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const value = {
    isOpen,
    openModal,
    closeModal,
    modalContent,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContainer>{modalContent}</ModalContainer>
        </ModalOverlay>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export { ModalHeader, ModalContent, ModalButton };
