import { AxiosError } from 'axios';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

/**
 * API 오류 응답의 공통 인터페이스
 */
export interface ErrorResponse {
  message?: string;
  status?: number;
  data?: any;
}

/**
 * Axios 오류 응답에 대한 타입 선언
 */
interface ApiErrorResponse {
  message?: string;
  [key: string]: any;
}

/**
 * 다양한 오류 유형을 분석하여 일관된 오류 메시지 반환
 * @param error 발생한 오류 객체
 * @returns 사용자에게 표시할 오류 메시지
 */
export function getErrorMessage(error: unknown): string {
  // Axios 오류인 경우 상세 정보 추출
  if (isAxiosError<ApiErrorResponse>(error)) {
    // API에서 제공하는 오류 메시지가 있으면 사용
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    // HTTP 상태 코드에 따른 기본 메시지 설정
    switch (error.response?.status) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '로그인이 필요하거나 인증이 만료되었습니다.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 500:
        return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      default:
        return '요청 처리 중 오류가 발생했습니다.';
    }
  }

  // Error 객체인 경우 메시지 사용
  if (error instanceof Error) {
    return error.message;
  }

  // 그 외 알 수 없는 오류
  return '알 수 없는 오류가 발생했습니다.';
}

/**
 * Axios 오류인지 확인하는 타입가드 (제네릭 지원)
 */
export function isAxiosError<T = any>(error: any): error is AxiosError<T> {
  return error && error.isAxiosError === true;
}

/**
 * 오류 모달 컨텐츠 생성 함수
 * Modal 컴포넌트에 적합한 형태의 오류 모달 컨텐츠를 반환합니다.
 */
export function createErrorModalContent(
  error: unknown,
  title = '오류 발생',
  closeModal?: () => void,
) {
  const message = getErrorMessage(error);

  return (
    <>
      <div className="modal-header">
        <AlertTriangle size={48} color="#E53E3E" />
        <h2>{title}</h2>
      </div>
      <div className="modal-content">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button onClick={closeModal} className="modal-close-button">
          확인
        </button>
      </div>
    </>
  );
}

/**
 * 애플리케이션 전체에서 오류를 일관되게 처리하는 함수
 * 콘솔에 오류를 로깅하고, 필요에 따라 모달을 표시합니다.
 */
export function handleError(
  error: unknown,
  showModal?: (content: React.ReactNode) => void,
  title = '오류 발생',
): void {
  // 항상 콘솔에 오류 로깅
  console.error('Error occurred:', error);

  // 모달 표시 함수가 제공된 경우 모달로 오류 표시
  if (showModal) {
    const modalContent = createErrorModalContent(error, title, () =>
      showModal(null),
    );
    showModal(modalContent);
  }
}
