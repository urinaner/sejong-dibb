import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/apiConfig';

// 로그인 크리덴셜 타입 정의
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

      let response;
      let userName: string;

      if (isAdminLogin) {
        // 관리자 로그인: multipart/form-data
        if (!(credentials instanceof FormData)) {
          throw new Error('관리자 로그인에는 FormData가 필요합니다.');
        }
        response = await axios.post(loginEndpoint, credentials, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        userName = String(credentials.get('loginId'));
      } else {
        // 학생 로그인: application/json
        if (credentials instanceof FormData) {
          throw new Error('학생 로그인에는 JSON 형식이 필요합니다.');
        }
        response = await axios.post(loginEndpoint, credentials, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        userName = credentials.loginId;
      }

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
