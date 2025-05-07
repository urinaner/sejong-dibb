import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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
  const navigate = useNavigate();

  // 모달 표시 상태
  const [showLoginModal, setShowLoginModal] = useState(
    requireAuth && !isAuthenticated,
  );
  const [showAdminModal, setShowAdminModal] = useState(
    requireAdmin && !isAdmin && isAuthenticated,
  );

  // 로그인 페이지로 이동
  const handleGoToLogin = () => {
    navigate(redirectPath, { state: { from: location } });
  };

  // 이전 페이지로 이동
  const handleGoBack = () => {
    navigate(-1);
  };

  // 메인 페이지로 이동
  const handleGoHome = () => {
    navigate('/');
  };

  // 모달 닫기 (세션 관리를 위한 후속 처리가 필요할 경우를 대비)
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    navigate(-1);
  };

  const handleCloseAdminModal = () => {
    setShowAdminModal(false);
    navigate(-1);
  };

  // 로그인된 사용자의 로그인 페이지 접근 제어 (기존 로직 유지)
  if (isAuthenticated && location.pathname === '/signin') {
    return <Navigate to="/" replace />;
  }

  // 관리자 권한이 필요한 페이지 로직 (모달 처리)
  if (requireAdmin) {
    // 비로그인 상태인 경우
    if (!isAuthenticated) {
      return (
        <>
          <Dialog
            open={showLoginModal}
            onClose={handleCloseLoginModal}
            aria-labelledby="login-required-dialog-title"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="login-required-dialog-title">
              <Box display="flex" alignItems="center" gap={1}>
                <LockIcon color="primary" />
                <Typography variant="h6">로그인이 필요합니다</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                이 페이지는 관리자만 접근할 수 있습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                계속하려면 관리자 계정으로 로그인해 주세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleGoBack} color="inherit">
                뒤로가기
              </Button>
              <Button
                onClick={handleGoToLogin}
                color="primary"
                variant="contained"
              >
                로그인하러 가기
              </Button>
            </DialogActions>
          </Dialog>

          {/* 로그인 모달 뒤에 보이는 백그라운드 컨텐츠 (흐리게 처리) */}
          <Box
            sx={{
              filter: 'blur(5px)',
              pointerEvents: 'none',
              minHeight: '80vh',
            }}
          >
            {children}
          </Box>
        </>
      );
    }

    // 로그인은 했지만 관리자가 아닌 경우
    if (!isAdmin) {
      return (
        <>
          <Dialog
            open={showAdminModal}
            onClose={handleCloseAdminModal}
            aria-labelledby="admin-required-dialog-title"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="admin-required-dialog-title">
              <Box display="flex" alignItems="center" gap={1}>
                <AdminPanelSettingsIcon color="error" />
                <Typography variant="h6">관리자 권한이 필요합니다</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                이 페이지는 관리자 권한이 있는 사용자만 접근할 수 있습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                접근 권한이 필요하시면 관리자에게 문의하세요.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleGoBack} color="inherit">
                뒤로가기
              </Button>
              <Button
                onClick={handleGoHome}
                color="primary"
                variant="contained"
              >
                메인으로 가기
              </Button>
            </DialogActions>
          </Dialog>

          {/* 권한 없음 모달 뒤에 보이는 백그라운드 컨텐츠 (흐리게 처리) */}
          <Box
            sx={{
              filter: 'blur(5px)',
              pointerEvents: 'none',
              minHeight: '80vh',
            }}
          >
            {children}
          </Box>
        </>
      );
    }

    // 관리자인 경우 접근 허용
    return <>{children}</>;
  }

  // 일반 인증이 필요한 페이지 체크 (모달 처리)
  if (requireAuth && !isAuthenticated) {
    return (
      <>
        <Dialog
          open={showLoginModal}
          onClose={handleCloseLoginModal}
          aria-labelledby="login-required-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="login-required-dialog-title">
            <Box display="flex" alignItems="center" gap={1}>
              <LockIcon color="primary" />
              <Typography variant="h6">로그인이 필요합니다</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              이 페이지는 로그인한 사용자만 접근할 수 있습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              계속하려면 로그인해 주세요.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGoBack} color="inherit">
              뒤로가기
            </Button>
            <Button
              onClick={handleGoToLogin}
              color="primary"
              variant="contained"
            >
              로그인하러 가기
            </Button>
          </DialogActions>
        </Dialog>

        {/* 로그인 모달 뒤에 보이는 백그라운드 컨텐츠 (흐리게 처리) */}
        <Box
          sx={{ filter: 'blur(5px)', pointerEvents: 'none', minHeight: '80vh' }}
        >
          {children}
        </Box>
      </>
    );
  }

  // 모든 조건을 통과한 경우 컨텐츠 표시
  return <>{children}</>;
};

export default ProtectedRoute;
