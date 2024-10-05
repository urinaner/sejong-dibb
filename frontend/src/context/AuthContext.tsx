import { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  signin: (userId: string, password: string) => Promise<void>;
  signout: () => void;
}

// 초기값 정의
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signin = async (userId: string, password: string) => {
    try {
      const response = await axios.post('/api/login', {
        email: userId,
        password: password,
      });

      // 서버에서 토큰을 받아온다
      const token = response.data.token;

      // 로그인 성공 시 사용자 정보 업데이트
      setUser(userId);
      setIsAuthenticated(true);

      // 받은 JWT 토큰을 로컬 스토리지 등에 저장
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('로그인 실패:', error);
      // 오류가 발생하면 예외를 던져서 상위에서 처리할 수 있도록 함
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
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
