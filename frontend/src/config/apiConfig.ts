const API_URL = process.env.REACT_APP_API_URL;

export const apiEndpoints = {
  thesis: {
    list: `${API_URL}/api/thesis`,
    create: `${API_URL}/api/thesis`,
    get: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
    update: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
    delete: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
  },
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
