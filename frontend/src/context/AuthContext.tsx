import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { axiosInstance } from '../config/apiConfig';

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

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
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

  const setAuthState = (tokens: TokenResponse | null) => {
    if (tokens) {
      try {
        const { accessToken, refreshToken } = tokens;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const payload = decodeJWT(accessToken);
        const userName = payload.loginId;
        const userRole = payload.role;

        localStorage.setItem('user', userName);
        localStorage.setItem('isAdmin', String(userRole === 'ADMIN'));

        setUser(userName);
        setIsAuthenticated(true);
        setIsAdmin(userRole === 'ADMIN');

        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
      } catch (error) {
        console.error('Auth state setting error:', error);
        setAuthState(null);
      }
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  const checkTokenExpiration = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      try {
        const payload = decodeJWT(accessToken);
        if (payload.exp * 1000 < Date.now()) {
          try {
            const response = await axiosInstance.post('api/member/refresh', {
              refreshToken: refreshToken,
            });

            const newTokens: TokenResponse = {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            };

            setAuthState(newTokens);
          } catch (error) {
            signout();
          }
        }
      } catch {
        signout();
      }
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setAuthState({ accessToken, refreshToken });
      checkTokenExpiration();
    }

    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
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
      const response = await axiosInstance.post(
        isAdminLogin ? 'api/admin/login' : 'api/member/login',
        credentials,
        {
          headers: {
            'Content-Type': isAdminLogin
              ? 'multipart/form-data'
              : 'application/json',
          },
        },
      );

      const { accessToken, refreshToken } = response.data;
      if (!accessToken || !refreshToken) {
        throw new Error('Invalid authentication response');
      }

      setAuthState({ accessToken, refreshToken });
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
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');

      if (!refreshToken || !accessToken) {
        throw new Error('No authentication tokens found');
      }

      await axiosInstance.post(
        'api/member/logout',
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthState(null);
      window.location.href = '/signin';
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
