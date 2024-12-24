import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/apiConfig';

interface JwtPayload {
  loginId: string;
  role: string;
  iat: number;
  exp: number;
}

interface LoginCredentials {
  loginId: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  signin: (
    credentials: FormData | LoginCredentials,
    isAdminLogin?: boolean,
  ) => Promise<void>;
  signout: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // JWT 토큰 디코딩 함수
  const decodeJWT = (token: string): JwtPayload => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT decode error:', error);
      throw new Error('Invalid token format');
    }
  };

  // 인증 상태 설정 함수
  const setAuthState = (token: string | null) => {
    if (token) {
      try {
        // JWT 토큰 저장
        localStorage.setItem('token', token);

        // 토큰 디코딩하여 사용자 정보 추출
        const payload = decodeJWT(token);
        const userName = payload.loginId;
        const userRole = payload.role;

        // 사용자 정보 저장
        localStorage.setItem('user', userName);
        localStorage.setItem('isAdmin', String(userRole === 'ADMIN'));

        // 상태 업데이트
        setUser(userName);
        setIsAuthenticated(true);
        setIsAdmin(userRole === 'ADMIN');

        // axios 기본 헤더 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Auth state setting error:', error);
        setAuthState(null);
      }
    } else {
      // 로그아웃 시 모든 인증 정보 제거
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  // 토큰 만료 체크
  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = decodeJWT(token);
        if (payload.exp * 1000 < Date.now()) {
          // 토큰이 만료되었으면 로그아웃
          signout();
        }
      } catch {
        signout();
      }
    }
  }, []);

  // 초기화
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState(token);
      checkTokenExpiration();
    }

    // 주기적으로 토큰 만료 체크
    const interval = setInterval(checkTokenExpiration, 60000); // 1분마다 체크
    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  const signin = async (
    credentials: FormData | LoginCredentials,
    isAdminLogin = false,
  ) => {
    if (!credentials) {
      setError('로그인 정보가 누락되었습니다.');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const loginEndpoint = isAdminLogin
        ? apiEndpoints.admin.login
        : apiEndpoints.user.login;

      const response = await axios.post(loginEndpoint, credentials, {
        headers: {
          'Content-Type': isAdminLogin
            ? 'multipart/form-data'
            : 'application/json',
        },
      });

      // Authorization 헤더에서 토큰 추출
      const authHeader = response.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Invalid authentication token');
      }

      const token = authHeader.split(' ')[1];
      setAuthState(token);
    } catch (error: any) {
      let errorMessage = '로그인에 실패했습니다.';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = '잘못된 요청입니다.';
            break;
          case 401:
            errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.';
            break;
          case 403:
            errorMessage = '접근이 거부되었습니다.';
            break;
          default:
            errorMessage =
              error.response.data?.message || '서버 오류가 발생했습니다.';
        }
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signout = useCallback(async () => {
    try {
      await axios.post(apiEndpoints.admin.signOut);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState(null);
      window.location.href = '/admin/signin';
    }
  }, []);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    error,
    signin,
    signout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
