import { useState, useCallback } from 'react';
import {
  AlertType,
  AlertModalState,
  ConfirmModalState,
  FormErrorModalState,
  UseNoticeModalsReturn,
} from '../types/modal.types';

const initialAlertState: AlertModalState = {
  isOpen: false,
  title: '',
  message: '',
  type: 'success',
};

const initialConfirmState: ConfirmModalState = {
  isOpen: false,
  title: '',
  message: '',
  onConfirm: null,
  isLoading: false,
};

const initialFormErrorState: FormErrorModalState = {
  isOpen: false,
  message: '',
};

export function useNoticeModals(): UseNoticeModalsReturn {
  const [alertModal, setAlertModal] =
    useState<AlertModalState>(initialAlertState);
  const [confirmModal, setConfirmModal] =
    useState<ConfirmModalState>(initialConfirmState);
  const [formErrorModal, setFormErrorModal] = useState<FormErrorModalState>(
    initialFormErrorState,
  );

  const showAlert = useCallback(
    (title: string, message: string, type: AlertType = 'success') => {
      setAlertModal({ isOpen: true, title, message, type });
    },
    [],
  );

  const showConfirm = useCallback(
    (title: string, message: string, onConfirm: () => Promise<void>) => {
      setConfirmModal((prev) => ({
        ...prev,
        isOpen: true,
        title,
        message,
        onConfirm,
        isLoading: false,
      }));
    },
    [],
  );

  const showFormError = useCallback((message: string) => {
    setFormErrorModal({ isOpen: true, message });
  }, []);

  const closeAlert = useCallback(() => {
    setAlertModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const closeFormError = useCallback(() => {
    setFormErrorModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const setConfirmLoading = useCallback((isLoading: boolean) => {
    setConfirmModal((prev) => ({ ...prev, isLoading }));
  }, []);

  return {
    alertModal,
    confirmModal,
    formErrorModal,
    showAlert,
    showConfirm,
    showFormError,
    closeAlert,
    closeConfirm,
    closeFormError,
    setConfirmLoading,
  };
}
