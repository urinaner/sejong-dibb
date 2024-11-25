import React from 'react';
import styled from 'styled-components';
import type { ModalSubComponentProps } from '../types/modal.types';

const StyledContent = styled.div<{ className?: string }>`
  padding: 1.5rem; /* p-6 */
  ${({ className }) => className && className}
`;

export function ModalContent({
  children,
  className = '',
}: ModalSubComponentProps) {
  return <StyledContent className={className}>{children}</StyledContent>;
}
