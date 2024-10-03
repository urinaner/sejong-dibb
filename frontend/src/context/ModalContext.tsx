import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. 모달 상태를 관리하는 Context 생성
interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 2. 모달 상태를 제공하는 Provider 컴포넌트
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
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
