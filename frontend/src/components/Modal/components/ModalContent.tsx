import React from 'react';
import styled from 'styled-components';
import type { ModalSubComponentProps } from '../types/modal.types';

const StyledContent = styled.div<{ className?: string }>`
  /* 기본 레이아웃 */
  padding: 2rem 2.5rem;
  position: relative;

  /* 텍스트 스타일링 */
  font-size: 1.3rem;
  line-height: 1.6;
  color: #374151;
  letter-spacing: -0.01em;

  /* 배경 및 테두리 */
  background: #ffffff;
  border-radius: 0.5rem;

  /* 스크롤 처리 */
  max-height: 70vh;
  overflow-y: auto;

  /* 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }

  /* 내부 요소 간격 */
  & > * + * {
    margin-top: 1rem;
  }

  /* 텍스트 선택 스타일 */
  ::selection {
    background: #e2e8f0;
    color: #1a202c;
  }

  /* 애니메이션 */
  transition: padding 0.2s ease-in-out;

  /* 반응형 패딩 조정 */
  @media (max-width: 640px) {
    padding: 1.5rem;
  }

  /* Lists 스타일링 */
  ul,
  ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  /* Links 스타일링 */
  a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: #1d4ed8;
    }
  }

  /* Code blocks */
  pre {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.375rem;
    overflow-x: auto;
  }

  /* Inline code */
  code {
    background: #f1f5f9;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th,
    td {
      padding: 0.75rem;
      border-bottom: 1px solid #e2e8f0;
      text-align: left;
    }

    th {
      background: #f8fafc;
      font-weight: 600;
    }
  }

  /* Custom class extension */
  ${({ className }) => className && className}
`;

export function ModalContent({
  children,
  className = '',
}: ModalSubComponentProps) {
  return <StyledContent className={className}>{children}</StyledContent>;
}
