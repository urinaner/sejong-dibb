import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { useModal } from '../index';

// 타입 정의 수정
export interface ModalCloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const StyledCloseButton = styled.button<{ className?: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  padding: 0.25rem;
  border-radius: 9999px;
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #1a202c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    background-color: #edf2f7;
    color: #e53e3e;
    border-color: #cbd5e0;
  }

  &:active {
    background-color: #e2e8f0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #e2e8f0;
  }

  ${({ className }) => className && className}
`;

export function ModalCloseButton({
  className = '',
  onClick,
  ...props
}: ModalCloseButtonProps) {
  const { closeModal } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    closeModal();
  };

  return (
    <StyledCloseButton
      type="button"
      className={className}
      onClick={handleClick}
      aria-label="Close modal"
      {...props}
    >
      <X size={18} strokeWidth={2} />
    </StyledCloseButton>
  );
}
