import { useState, useCallback } from 'react';

interface ModalState {
  alert: {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  };
  confirm: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    isLoading: boolean;
  };
  formError: {
    isOpen: boolean;
    message: string;
  };
}

export function useNoticeModals() {
  const [modalState, setModalState] = useState<ModalState>({
    alert: {
      isOpen: false,
      title: '',
      message: '',
      type: 'success',
    },
    confirm: {
      isOpen: false,
      title: '',
      message: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onConfirm: () => {},
      isLoading: false,
    },
    formError: {
      isOpen: false,
      message: '',
    },
  });

  const showAlert = useCallback(
    (title: string, message: string, type: 'success' | 'error' = 'success') => {
      setModalState((prev) => ({
        ...prev,
        alert: { isOpen: true, title, message, type },
      }));
    },
    [],
  );

  const showConfirm = useCallback(
    (
      title: string,
      message: string,
      onConfirm: () => void,
      confirmText?: string,
      cancelText?: string,
    ) => {
      setModalState((prev) => ({
        ...prev,
        confirm: {
          isOpen: true,
          title,
          message,
          onConfirm,
          confirmText,
          cancelText,
          isLoading: false,
        },
      }));
    },
    [],
  );

  const showFormError = useCallback((message: string) => {
    setModalState((prev) => ({
      ...prev,
      formError: { isOpen: true, message },
    }));
  }, []);

  const closeAlert = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      alert: { ...prev.alert, isOpen: false },
    }));
  }, []);

  const closeConfirm = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      confirm: { ...prev.confirm, isOpen: false },
    }));
  }, []);

  const closeFormError = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      formError: { ...prev.formError, isOpen: false },
    }));
  }, []);

  const setConfirmLoading = useCallback((isLoading: boolean) => {
    setModalState((prev) => ({
      ...prev,
      confirm: { ...prev.confirm, isLoading },
    }));
  }, []);

  return {
    modalState,
    showAlert,
    showConfirm,
    showFormError,
    closeAlert,
    closeConfirm,
    closeFormError,
    setConfirmLoading,
  };
}
