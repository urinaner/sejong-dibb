// src/components/ProtectedRoute/ProtectedRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Props 인터페이스 정의
interface ProtectedRouteProps {
  children: React.ReactNode; // 보호할 자식 컴포넌트
  requireAuth?: boolean; // 인증 필요 여부 (기본값: true)
  requireAdmin?: boolean; // 관리자 권한 필요 여부 (기본값: false)
  redirectPath?: string; // 리다이렉션 경로 (기본값: '/signin')
}

/**
 * 라우트 보호를 위한 고차 컴포넌트
 *
 * @param children - 보호할 컴포넌트
 * @param requireAuth - 인증 필요 여부
 * @param requireAdmin - 관리자 권한 필요 여부
 * @param redirectPath - 인증 실패시 리다이렉션 경로
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectPath = '/admin/signin',
}) => {
  // 인증 컨텍스트에서 필요한 값들을 가져옴
  const { isAuthenticated, isAdmin } = useAuth();
  // 현재 위치 정보를 가져옴
  const location = useLocation();

  /**
   * 접근 권한 검증 로직
   */
  const checkAccess = (): boolean => {
    // 1. 인증이 필요하지 않은 경우
    if (!requireAuth) {
      return true;
    }

    // 2. 인증이 필요하지만 인증되지 않은 경우
    if (!isAuthenticated) {
      return false;
    }

    // 3. 관리자 권한이 필요한 경우
    if (requireAdmin && !isAdmin) {
      return false;
    }

    return true;
  };

  /**
   * 이미 인증된 사용자의 로그인/회원가입 페이지 접근 제어
   */
  const isAuthPage = (): boolean => {
    return ['/admin/signin'].includes(location.pathname);
  };

  // 이미 인증된 사용자가 로그인/회원가입 페이지 접근 시 메인으로 리다이렉트
  if (isAuthenticated && isAuthPage()) {
    return <Navigate to="/" replace />;
  }

  // 접근 권한이 없는 경우 처리
  if (!checkAccess()) {
    // 관리자 권한이 필요한 페이지인 경우 메인 페이지로 리다이렉트
    if (requireAdmin) {
      return <Navigate to="/" replace />;
    }

    // 인증이 필요한 페이지인 경우 로그인 페이지로 리다이렉트
    // state로 현재 위치를 전달하여 로그인 후 원래 페이지로 돌아올 수 있게 함
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // 접근 권한이 있는 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
