interface ScrollPosition {
  x: number;
  y: number;
}

export const focusableElements = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let scrollPosition: ScrollPosition | null = null;

function getScrollPosition(): ScrollPosition {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  };
}

function setScrollPosition(position: ScrollPosition) {
  window.scrollTo(position.x, position.y);
}

function preventScroll() {
  scrollPosition = getScrollPosition();

  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  Object.assign(document.body.style, {
    position: 'fixed',
    top: `-${scrollPosition.y}px`,
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    paddingRight: `${scrollBarWidth}px`, // 스크롤바 점프 방지
    overflow: 'hidden',
  });
}

function restoreScroll() {
  if (!scrollPosition) return;

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

  setScrollPosition(scrollPosition);
  scrollPosition = null;
}

export function trapFocus(element: HTMLElement) {
  const focusableEls = element.querySelectorAll(focusableElements);
  const firstFocusableEl = focusableEls[0] as HTMLElement;
  const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;

  // 모달 열릴 때 스크롤 방지
  preventScroll();

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

  function handleEscKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      // ESC 키로 모달을 닫을 때도 스크롤 복원
      restoreScroll();
    }
  }

  element.addEventListener('keydown', handleTabKey);
  element.addEventListener('keydown', handleEscKey);
  firstFocusableEl?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
    element.removeEventListener('keydown', handleEscKey);
    // cleanup 시 스크롤 복원
    restoreScroll();
  };
}
