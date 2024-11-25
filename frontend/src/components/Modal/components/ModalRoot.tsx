import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import type { ModalRootProps } from '../types/modal.types';

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div<{ className?: string }>`
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  ${({ className }) => className && className}
`;

export function ModalRoot({
  children,
  isOpen,
  onClose,
  className,
}: ModalRootProps) {
  if (!isOpen) return null;

  return createPortal(
    <ModalWrapper>
      <Overlay onClick={onClose} />
      <ModalContent className={className}>{children}</ModalContent>
    </ModalWrapper>,
    document.body,
  );
}
