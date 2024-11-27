import React from 'react';
import styled from 'styled-components';
import type { ModalSubComponentProps } from '../types/modal.types';

const StyledDeleteButton = styled.button<{ $isDeleting?: boolean }>`
  /* 기본 레이아웃 */
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* 텍스트 스타일링 */
  font-size: 0.875rem;
  font-weight: 500;
  color: white;

  /* 배경 및 테두리 */
  background-color: ${({ $isDeleting }) =>
    $isDeleting ? '#fed7d7' : '#e53e3e'};
  border: 1px solid
    ${({ $isDeleting }) => ($isDeleting ? '#feb2b2' : '#c53030')};
  border-radius: 0.375rem;

  /* 상호작용 */
  cursor: ${({ $isDeleting }) => ($isDeleting ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;

  /* 호버 상태 */
  &:hover:not(:disabled) {
    background-color: #c53030;
    border-color: #9b2c2c;
  }

  /* 비활성화 상태 */
  &:disabled {
    background-color: #fed7d7;
    border-color: #feb2b2;
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Custom class extension */
  ${({ className }) => className && className}
`;

export interface ModalDeleteButtonProps extends ModalSubComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  isDeleting?: boolean;
  label?: string;
}

export function ModalDeleteButton({
  children,
  onClick,
  disabled = false,
  isDeleting = false,
  label,
  className = '',
}: ModalDeleteButtonProps) {
  return (
    <StyledDeleteButton
      type="button"
      onClick={onClick}
      disabled={disabled || isDeleting}
      $isDeleting={isDeleting}
      className={className}
      aria-label={label}
    >
      {children || (isDeleting ? '삭제 중...' : '삭제')}
    </StyledDeleteButton>
  );
}
