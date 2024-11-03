// src/context/AuthContext.tsx
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

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };

    initializeAuth();
  }, []);

  const signin = async (userName: string, password: string) => {
    if (!userName || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      throw new Error('아이디와 비밀번호가 필요합니다.');
    }

    setIsLoading(true);
    clearError();

    try {
      console.log(
        `로그인 시도 중 - loginId: ${userName}, password: ${password}`,
      );

      // FormData 객체 생성 및 필드 추가
      const formData = new FormData();
      formData.append('loginId', userName);
      formData.append('password', password);

      // axios를 이용한 multipart/form-data 형식의 POST 요청
      const response = await axios.post(apiEndpoints.admin.login, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const authorizationHeader = response.headers['authorization'];
      const token = authorizationHeader && authorizationHeader.split(' ')[1];

      if (!token) {
        throw new Error('인증 토큰을 받지 못했습니다.');
      }

      // 토큰 저장
      localStorage.setItem('token', token);
      localStorage.setItem('user', userName);

      // axios 기본 설정 업데이트
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userName);
      setIsAuthenticated(true);
      setError(null);
    } catch (error: any) {
      console.error('로그인 실패:', error);
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
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // 로그아웃 API 호출
      await axios.post(apiEndpoints.admin.signOut);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/signin';
    }
  }, []);

  useEffect(() => {
    let isLoggingOut = false;

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // 토큰 만료 등의 인증 에러일 때만 로그아웃
        if (
          !isLoggingOut &&
          error.response?.status === 401 &&
          error.response?.data?.message?.includes('만료')
        ) {
          isLoggingOut = true;
          await signout();
          isLoggingOut = false;
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [signout]);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

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
