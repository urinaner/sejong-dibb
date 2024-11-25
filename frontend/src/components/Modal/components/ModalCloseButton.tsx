import React from 'react';
import styled from 'styled-components';
import type { ModalCloseButtonProps } from '../types/modal.types';

const CloseButton = styled.button<{ className?: string }>`
  position: absolute;
  top: 1rem; /* top-4 */
  right: 1rem; /* right-4 */
  padding: 0.5rem; /* p-2 */
  border-radius: 9999px; /* rounded-full */
  transition: background-color 0.2s; /* transition-colors */

  &:hover {
    background-color: #f3f4f6; /* hover:bg-gray-100 */
  }

  ${({ className }) => className && className}
`;

const CloseIcon = styled.svg`
  width: 16px;
  height: 16px;
`;

export function ModalCloseButton({
  onClick,
  className = '',
}: ModalCloseButtonProps) {
  return (
    <CloseButton
      onClick={onClick}
      className={className}
      aria-label="Close modal"
    >
      <CloseIcon
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
      </CloseIcon>
    </CloseButton>
  );
}
