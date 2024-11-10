import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/apiConfig';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signin: (userName: string, password: string) => Promise<void>;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // 인증 상태 설정 함수
  const setAuthState = (token: string | null, userName: string | null) => {
    if (token && userName) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', userName);
      setUser(userName);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const signout = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthState(null, null);
        return;
      }

      await axios.post(apiEndpoints.admin.signOut);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState(null, null);
      window.location.href = '/signin';
    }
  }, []);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      if (token && savedUser) {
        setAuthState(token, savedUser);
      }
    };

    let isLoggingOut = false;

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Content-Type 설정 (multipart/form-data가 아닌 경우에만)
        if (
          config.headers &&
          config.headers['Content-Type'] !== 'multipart/form-data'
        ) {
          config.headers['Content-Type'] = 'application/json';
        }

        // XSRF 토큰 관련 설정 제거
        if (config.headers) {
          delete config.headers['X-XSRF-TOKEN'];
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // 게시판 관련 공개 API의 401/403 에러는 무시
        const isPublicBoardEndpoint =
          error.config?.url?.includes('/api/board') &&
          (error.config?.method === 'get' || error.config?.method === 'GET');

        if (
          !isLoggingOut &&
          error.response?.status === 401 &&
          !isPublicBoardEndpoint
        ) {
          isLoggingOut = true;
          await signout();
          isLoggingOut = false;
        }
        return Promise.reject(error);
      },
    );

    initializeAuth();

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [signout]);

  const signin = async (userName: string, password: string) => {
    if (!userName || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const formData = new FormData();
      formData.append('loginId', userName);
      formData.append('password', password);

      const response = await axios.post(apiEndpoints.admin.login, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const token = response.headers['authorization'];

      if (!token) {
        throw new Error('인증 토큰을 받지 못했습니다.');
      }

      setAuthState(token, userName);
      setError(null);
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

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    signin,
    signout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
