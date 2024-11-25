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
