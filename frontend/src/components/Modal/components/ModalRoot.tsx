import React from 'react';
import { createPortal } from 'react-dom';
import type { ModalRootProps } from '../types/modal.types';

export function ModalRoot({
  children,
  isOpen,
  onClose,
  className,
}: ModalRootProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={`relative bg-white rounded-lg shadow-xl ${className}`}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
