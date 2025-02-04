import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectPath = '/signin',
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // 관리자 권한이 필요한 페이지 체크
  if (requireAdmin) {
    // 비로그인 상태인 경우
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    // 로그인은 했지만 관리자가 아닌 경우
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
    // 관리자인 경우 접근 허용
    return <>{children}</>;
  }

  // 일반 인증이 필요한 페이지 체크
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // 로그인된 사용자의 로그인 페이지 접근 제어
  if (isAuthenticated && location.pathname === '/signin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
