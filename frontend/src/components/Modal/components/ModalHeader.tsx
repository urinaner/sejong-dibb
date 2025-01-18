import React from 'react';
import styled from 'styled-components';
import type { ModalSubComponentProps } from '../types/modal.types';

const StyledHeader = styled.div`
  padding: 1.5rem; // p-6과 동일
  border-bottom: 1px solid #e5e7eb; // border-gray-200과 동일
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  text-align: center;
  margin-top: 0.5rem;

  // 추가적인 스타일링
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  word-break: keep-all;
`;

export function ModalHeader({
  children,
  className = '',
}: ModalSubComponentProps) {
  return <StyledHeader className={className}>{children}</StyledHeader>;
}
