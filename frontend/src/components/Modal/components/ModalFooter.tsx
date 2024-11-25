import React from 'react';
import type { ModalSubComponentProps } from '../types/modal.types';

export function ModalFooter({
  children,
  className = '',
}: ModalSubComponentProps) {
  return (
    <div
      className={`flex justify-end gap-2 p-6 border-t border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}
