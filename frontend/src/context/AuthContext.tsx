import { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  signin: (userName: string, password: string) => Promise<void>;
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
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const signin = async (userName: string, password: string) => {
    try {
      console.log(
        `try to sign in as username: :${userName} password: ${password}`,
      );
      const response = await axios.post(`${apiUrl}/api/admin/login`, {
        userId: userName,
        password: password,
      });

      // 서버에서 토큰을 받아온다
      const authorizationHeader = response.headers['authorization']; // 헤더에서 'authorization' 추출
      const token = authorizationHeader && authorizationHeader.split(' ')[1]; // 'Bearer' 제거 후 JWT 토큰만 추출

      // if (!token) {
      //   throw new Error('JWT 토큰을 찾을 수 없습니다.');
      // }

      // 로그인 성공 시 사용자 정보 업데이트
      setUser(userName);
      setIsAuthenticated(true);

      console.log('저장할 JWT토큰:', token);
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
