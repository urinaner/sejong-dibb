import React from 'react';
import type { ModalCloseButtonProps } from '../types/modal.types';

export function ModalCloseButton({
  onClick,
  className = '',
}: ModalCloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors ${className}`}
      aria-label="Close modal"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12M4 4L12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
