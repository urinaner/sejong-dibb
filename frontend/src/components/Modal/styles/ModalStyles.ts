import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 500px;
  margin: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

// components/Modal/utils/modalUtils.ts
export const focusableElements = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function trapFocus(element: HTMLElement) {
  const focusableEls = element.querySelectorAll(focusableElements);
  const firstFocusableEl = focusableEls[0] as HTMLElement;
  const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;

  function handleTabKey(e: KeyboardEvent) {
    const isTabPressed = e.key === 'Tab';

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleTabKey);
  firstFocusableEl?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}
