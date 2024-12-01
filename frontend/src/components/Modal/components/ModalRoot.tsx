import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import type { ModalRootProps } from '../types/modal.types';

interface ScrollPosition {
  x: number;
  y: number;
}

function getScrollPosition(): ScrollPosition {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  };
}

function preventScroll(scrollPosition: ScrollPosition) {
  // 스크롤바 너비 계산 - 스크롤바로 인한 레이아웃 이동 방지
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // body style 설정으로 스크롤 방지
  Object.assign(document.body.style, {
    position: 'fixed',
    top: `-${scrollPosition.y}px`,
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    paddingRight: `${scrollBarWidth}px`,
    overflow: 'hidden',
  });
}

function restoreScroll(scrollPosition: ScrollPosition) {
  // body style 초기화
  Object.assign(document.body.style, {
    position: '',
    top: '',
    left: '',
    right: '',
    bottom: '',
    width: '',
    paddingRight: '',
    overflow: '',
  });

  // 이전 스크롤 위치로 복원
  window.scrollTo(scrollPosition.x, scrollPosition.y);
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;

  @media (max-width: 640px) {
    padding: 1rem;
    align-items: flex-end;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div<{ className?: string }>`
  position: relative;
  background-color: white;
  border-radius: 1rem;
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;

  /* Modern scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 3px;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 100%;
    border-radius: 1rem 1rem 0 0;
    max-height: 85vh;
  }

  ${({ className }) => className && className}
`;

export function ModalRoot({
  children,
  isOpen,
  onClose,
  className,
}: ModalRootProps) {
  // 스크롤 위치 저장을 위한 ref
  const scrollPositionRef = useRef<ScrollPosition | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 현재 스크롤 위치 저장
      scrollPositionRef.current = getScrollPosition();
      preventScroll(scrollPositionRef.current);

      // ESC 키 이벤트 핸들러
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.removeEventListener('keydown', handleEscKey);
        // 스크롤 위치가 저장되어 있다면 복원
        if (scrollPositionRef.current) {
          restoreScroll(scrollPositionRef.current);
          scrollPositionRef.current = null;
        }
      };
    }
  }, [isOpen, onClose]);

  // iOS Safari에서의 스크롤 방지를 위한 터치 이벤트 핸들러
  const handleTouchMove = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isModalContent = target.closest(`.${ModalContent.styledComponentId}`);

    // 모달 컨텐츠 영역이 아니면 터치 이벤트 방지
    if (!isModalContent) {
      e.preventDefault();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalWrapper onTouchMove={handleTouchMove}>
      <Overlay onClick={onClose} />
      <ModalContent className={className} role="dialog" aria-modal="true">
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.body,
  );
}
