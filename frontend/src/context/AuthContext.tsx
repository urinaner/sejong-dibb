import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/apiConfig';

// AuthContext 타입 정의
interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  signin: (
    username: string,
    password: string,
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

  // 인증 상태 설정 함수
  const setAuthState = (userName: string | null, adminRole = false) => {
    if (userName) {
      localStorage.setItem('user', userName);
      localStorage.setItem('isAdmin', String(adminRole));
      setUser(userName);
      setIsAuthenticated(true);
      setIsAdmin(adminRole);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  // 로그아웃 함수
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

  // 초기화
  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('user');
      const savedIsAdmin = localStorage.getItem('isAdmin') === 'true';

      if (savedUser) {
        setAuthState(savedUser, savedIsAdmin);
      }
    };

    initializeAuth();
  }, []);

  const signin = async (
    userName: string,
    password: string,
    isAdminLogin = false,
  ) => {
    if (!userName || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const formData = new FormData();

      // 관리자/학생 로그인에 따라 다른 프로퍼티명 사용
      if (isAdminLogin) {
        formData.append('loginId', userName); // 관리자용 ID 프로퍼티
        formData.append('password', password);
      } else {
        formData.append('loginId', String(userName)); // 학생용 ID 프로퍼티
        formData.append('password', String(password));
      }

      // 관리자/학생 로그인 엔드포인트 선택
      const loginEndpoint = isAdminLogin
        ? apiEndpoints.admin.login
        : apiEndpoints.user.login;

      const response = await axios.post(loginEndpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setAuthState(userName, isAdminLogin);
      } else {
        throw new Error('로그인에 실패했습니다.');
      }
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
