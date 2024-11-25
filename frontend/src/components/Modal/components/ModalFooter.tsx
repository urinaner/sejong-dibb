import React from 'react';
import styled from 'styled-components';
import type { ModalSubComponentProps } from '../types/modal.types';

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto; // footer를 하단에 고정
`;

const FooterButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1557b0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  // 취소 버튼용 스타일 변형
  &.cancel {
    background-color: #f3f4f6;
    color: #4b5563;

    &:hover {
      background-color: #e5e7eb;
    }
  }
`;

export function ModalFooter({
  children,
  className = '',
}: ModalSubComponentProps) {
  return <StyledFooter className={className}>{children}</StyledFooter>;
}

export { FooterButton };
