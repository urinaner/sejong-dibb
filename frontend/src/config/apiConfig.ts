// 환경 변수에서 API URL을 불러오는 방식
const API_URL = process.env.REACT_APP_API_URL;

// API 엔드포인트들을 객체로 관리
export const apiEndpoints = {
  professor: {
    create: `${API_URL}/api/professor`,
    get: (professorId: string) => `${API_URL}/api/professor/${professorId}`,
    update: (professorId: string) => `${API_URL}/api/professor/${professorId}`,
    delete: (professorId: string) => `${API_URL}/api/professor/${professorId}`,
  },
  admin: {
    login: `${API_URL}/api/admin/login`,
    signOut: `${API_URL}/api/admin/signOut`,
    register: `${API_URL}/api/admin/join`,
  },
  department: {
    get: (id: string) => `${API_URL}/api/departments/${id}`,
    update: (id: string) => `${API_URL}/api/departments/${id}`,
    delete: (id: string) => `${API_URL}/api/departments/${id}`,
    create: `${API_URL}/api/departments`,
  },
  main: {
    get: `${API_URL}/api/`, // 메인 엔드포인트
  },
  board: {
    list: `${API_URL}/api/board`, // 기본 list 엔드포인트
    listWithPage: (page: number, size: number, sort: string = 'title') => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort: sort, // sort 파라미터를 항상 포함
      });
      return `${API_URL}/api/board?${params.toString()}`;
    },
    create: `${API_URL}/api/board`,
    get: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    update: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    delete: (boardId: string) => `${API_URL}/api/board/${boardId}`,
  },
};

// 기본 API URL도 필요에 따라 export
export default API_URL;
