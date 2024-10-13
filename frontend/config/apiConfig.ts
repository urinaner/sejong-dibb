// 환경 변수에서 API URL을 불러오는 방식
const API_URL = process.env.REACT_APP_API_URL;

// API 엔드포인트들을 객체로 관리
export const apiEndpoints = {
  professor: {
    create: `${API_URL}/professor`,
    get: (professorId) => `${API_URL}/professor/${professorId}`,
    update: (professorId) => `${API_URL}/professor/${professorId}`,
    delete: (professorId) => `${API_URL}/professor/${professorId}`,
  },
  admin: {
    login: `${API_URL}/admin/login`,
    signOut: `${API_URL}/admin/signOut`,
    register: `${API_URL}/admin/join`,
  },
  department: {
    get: (id) => `${API_URL}/departments/${id}`,
    update: (id) => `${API_URL}/departments/${id}`,
    delete: (id) => `${API_URL}/departments/${id}`,
    create: `${API_URL}/departments`,
  },
  main: {
    get: `${API_URL}/`, // 메인 엔드포인트
  },
};

// 기본 API URL도 필요에 따라 export
export default API_URL;
