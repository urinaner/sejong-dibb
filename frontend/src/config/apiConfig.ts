const API_URL = process.env.REACT_APP_API_URL;

export const apiEndpoints = {
  professor: {
    // GET /api/professor - 모든 교수 조회 API (페이지네이션)
    list: `${API_URL}/api/professor`,
    listWithPage: (page: number, size: number, sort?: string[]) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (sort && sort.length > 0) {
        sort.forEach((sortItem) => params.append('sort', sortItem));
      }
      return `${API_URL}/api/professor?${params.toString()}`;
    },

    // - 교수 생성 API
    create: `${API_URL}/api/professor`,

    // - 교수 상세 정보 반환 API
    detail: (professorId: number) => `${API_URL}/api/professor/${professorId}`,

    // - 교수 정보 업데이트 API
    update: (professorId: number) => `${API_URL}/api/professor/${professorId}`,

    // - 교수 삭제 API
    delete: (professorId: number) => `${API_URL}/api/professor/${professorId}`,
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
    get: `${API_URL}/api/`,
  },
  board: {
    list: `${API_URL}/api/board`,
    listWithPage: (page: number, size: number, category?: string) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (category) {
        params.append('category', category);
      }
      return `${API_URL}/api/board?${params.toString()}`;
    },
    create: `${API_URL}/api/board`,
    get: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    update: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    delete: (boardId: string) => `${API_URL}/api/board/${boardId}`,
  },
};

export default API_URL;
