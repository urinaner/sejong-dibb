import { createContext, useState, ReactNode } from 'react';
import React from 'react';
import axios from 'axios';

// 로그인 상태와 함수를 담는 타입 정의
interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (userEmail: string, password: string) => Promise<void>;
  logout: () => void;
}

interface Props {
  children: React.ReactNode;
}

// 초기값 정의
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null); // 사용자 정보를 저장
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 인증 상태

  // 로그인 요청 함수
  async function loginRequest(
    userEmail: string,
    password: string,
  ): Promise<string> {
    try {
      const response = await axios.post('/api/login', {
        email: userEmail,
        password: password,
      });

      if (response.status === 200) {
        return response.data.token; // 서버로부터 받은 JWT 토큰
      } else {
        throw new Error('로그인 실패: 서버 오류');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('로그인 실패: 서버 오류', error.response?.data);
        throw new Error('서버 오류로 인해 로그인 실패');
      } else {
        console.error('로그인 실패: 네트워크 오류 또는 기타 문제', error);
        throw new Error('네트워크 오류로 인해 로그인 실패');
      }
    }
  }

  // 로그인 함수: 사용자가 로그인할 때 호출
  const login = async (userEmail: string, password: string) => {
    // 서버에 로그인 요청을 보내고 JWT 토큰을 받아오는 로직
    const token = await loginRequest(userEmail, password);

    // 로그인 성공 시 사용자 정보 업데이트
    setUser(userEmail);
    setIsAuthenticated(true);

    // 받은 JWT 토큰을 로컬 스토리지 등에 저장하여 사용
    localStorage.setItem('token', token);
  };

  // 로그아웃 함수: 사용자가 로그아웃할 때 호출
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // 토큰 삭제
  };

  // AuthContext.Provider가 제공하는 value 객체
  const authValue: AuthContextType = {
    user, // 현재 사용자 정보
    isAuthenticated, // 로그인 상태
    login, // 로그인 함수
    logout, // 로그아웃 함수
  };

  // children 컴포넌트에게 value 값을 제공
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
