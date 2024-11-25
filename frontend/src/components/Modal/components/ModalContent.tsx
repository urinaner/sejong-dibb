import React from 'react';
import type { ModalSubComponentProps } from '../types/modal.types';

export function ModalContent({
  children,
  className = '',
}: ModalSubComponentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
