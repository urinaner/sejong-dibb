import React, { createContext, useContext, useState } from 'react';
import type { ModalContextType } from '../types/modal.types';

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = (newContent: React.ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, content }}>
      {children}
    </ModalContext.Provider>
  );
}
