// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * AuthContext를 사용하기 위한 커스텀 훅
 * 인증 관련 상태와 메서드들을 제공
 *
 * @returns {Object} AuthContext의 값들
 * @throws {Error} AuthProvider 외부에서 사용될 경우 에러 발생
 *
 * @example
 * const MyComponent = () => {
 *   const { user, isAuthenticated, signin, signout } = useAuth();
 *
 *   return (
 *     <div>
 *       {isAuthenticated ? (
 *         <>
 *           <p>Welcome, {user}!</p>
 *           <button onClick={signout}>Logout</button>
 *         </>
 *       ) : (
 *         <button onClick={() => signin(username, password)}>Login</button>
 *       )}
 *     </div>
 *   );
 * };
 */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
        'Wrap a parent component in <AuthProvider> to fix this error.',
    );
  }

  return context;
};

/**
 * 타입 정의를 위한 인터페이스
 * AuthContext의 반환 값들의 타입을 명시적으로 정의
 */
export interface UseAuthReturn {
  /** 현재 로그인한 사용자의 이름 */
  user: string | null;

  /** 현재 인증 상태 */
  isAuthenticated: boolean;

  /** 인증 작업 진행 중 여부 */
  isLoading: boolean;

  /** 인증 과정에서 발생한 에러 메시지 */
  error: string | null;

  /**
   * 로그인 함수
   * @param userName - 사용자 이름
   * @param password - 비밀번호
   */
  signin: (userName: string, password: string) => Promise<void>;

  /** 로그아웃 함수 */
  signout: () => Promise<void>;

  /** 에러 메시지 초기화 함수 */
  clearError: () => void;
}

// 사용 예시와 함께하는 주석
/**
 * @example
 * // 기본적인 사용법
 * const LoginComponent = () => {
 *   const { signin, error, isLoading } = useAuth();
 *   const [username, setUsername] = useState('');
 *   const [password, setPassword] = useState('');
 *
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     try {
 *       await signin(username, password);
 *       // 로그인 성공 처리
 *     } catch (err) {
 *       // 에러 처리
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {error && <div className="error">{error}</div>}
 *       <input
 *         type="text"
 *         value={username}
 *         onChange={(e) => setUsername(e.target.value)}
 *       />
 *       <input
 *         type="password"
 *         value={password}
 *         onChange={(e) => setPassword(e.target.value)}
 *       />
 *       <button type="submit" disabled={isLoading}>
 *         {isLoading ? '로그인 중...' : '로그인'}
 *       </button>
 *     </form>
 *   );
 * };
 *
 * // 조건부 렌더링 예시
 * const NavBar = () => {
 *   const { isAuthenticated, user, signout } = useAuth();
 *
 *   return (
 *     <nav>
 *       {isAuthenticated ? (
 *         <>
 *           <span>Welcome, {user}!</span>
 *           <button onClick={signout}>로그아웃</button>
 *         </>
 *       ) : (
 *         <Link to="/login">로그인</Link>
 *       )}
 *     </nav>
 *   );
 * };
 */

export default useAuth;
