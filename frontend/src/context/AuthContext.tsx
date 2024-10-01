import { createContext, useState, ReactNode } from 'react';
import React from 'react';
import axios from 'axios';

// 로그인 상태와 함수를 담는 타입 정의
interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  signin: (userEmail: string, password: string) => Promise<void>;
  signout: () => void;
}

interface Props {
  children: React.ReactNode;
}

// 초기값 정의
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null); // 사용자 정보를 저장
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 인증 상태

  // 로그인 함수: 사용자가 로그인할 때 호출
  const signin = async (userEmail: string, password: string) => {
    try {
      const response = await axios.post('/api/login', {
        email: userEmail,
        password,
      });

      // 서버에서 토큰을 받아온다
      const token = response.data.token;

      // 로그인 성공 시 사용자 정보 업데이트
      setUser(userEmail);
      setIsAuthenticated(true);

      // 받은 JWT 토큰을 로컬 스토리지 등에 저장
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  // 로그아웃 함수: 사용자가 로그아웃할 때 호출
  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // 토큰 삭제
  };

  // AuthContext.Provider가 제공하는 value 객체
  const authValue: AuthContextType = {
    user, // 현재 사용자 정보
    isAuthenticated, // 로그인 상태
    signin, // 로그인 함수
    signout, // 로그아웃 함수
  };

  // children 컴포넌트에게 value 값을 제공
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
