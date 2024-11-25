import React from 'react';
import type { ModalSubComponentProps } from '../types/modal.types';

export function ModalHeader({
  children,
  className = '',
}: ModalSubComponentProps) {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
