import { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/apiConfig';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  signin: (userName: string, password: string) => Promise<void>;
  signout: () => void;
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
  const [error, setError] = useState<string | null>(null);

  const signin = async (userName: string, password: string) => {
    if (!userName || !password) {
      console.error('아이디와 비밀번호가 필요합니다.');
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

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

      setUser(userName);
      setIsAuthenticated(true);
      setError(null);
      localStorage.setItem('token', token);
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setError(error.response?.data?.message || '로그인 실패');
      throw error;
    }
  };

  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const authValue: AuthContextType = {
    user,
    isAuthenticated,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </AuthContext.Provider>
  );
};
