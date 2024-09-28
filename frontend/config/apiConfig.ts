// 환경 변수에서 API URL을 불러오는 방식
const API_URL = process.env.REACT_APP_API_URL;
// API 엔드포인트들을 객체로 관리
export const apiEndpoints = {
  login: `${API_URL}/login`,
  register: `${API_URL}/register`,
  userData: `${API_URL}/user/data`,
};

// 기본 API URL도 필요에 따라 export
export default API_URL;
