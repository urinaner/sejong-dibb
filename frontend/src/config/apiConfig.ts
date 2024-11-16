const API_URL = process.env.REACT_APP_API_URL;

export const apiEndpoints = {
  thesis: {
    list: `${API_URL}/api/thesis`,
    listWithPage: (page: number, size: number, sort?: string[]) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (sort && sort.length > 0) {
        sort.forEach((sortItem) => params.append('sort', sortItem));
      }
      return `${API_URL}/api/thesis?${params.toString()}`;
    },
    create: `${API_URL}/api/thesis`,
    get: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
    update: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
    delete: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
  },
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

    thesis: {
      // GET /api/thesis - 모든 논문 조회 API
      list: `${API_URL}/api/thesis`,
      listWithPage: (page: number, size: number) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });
        return `${API_URL}/api/thesis?${params.toString()}`;
      },

      // POST /api/thesis - 논문 생성 API
      create: `${API_URL}/api/thesis`,

      // GET /api/thesis/{thesisId} - 논문 상세 정보 반환 API
      detail: (thesisId: number) => `${API_URL}/api/thesis/${thesisId}`,

      // POST /api/thesis/{thesisId} - 논문 정보 업데이트 API
      update: (thesisId: number) => `${API_URL}/api/thesis/${thesisId}`,

      // DELETE /api/thesis/{thesisId} - 논문 삭제 API
      delete: (thesisId: number) => `${API_URL}/api/thesis/${thesisId}`,
    },

    create: `${API_URL}/api/professor`,

    detail: (professorId: number) => `${API_URL}/api/professor/${professorId}`,

    update: (professorId: number) => `${API_URL}/api/professor/${professorId}`,

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
    base: `${API_URL}/api/board`,
    listWithPage: (page: number, size: number) =>
      `${API_URL}/api/board?page=${page}&size=${size}`,
    create: `${API_URL}/api/board`,
    get: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    update: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    delete: (boardId: string) => `${API_URL}/api/board/${boardId}`,
  },
};

export default API_URL;
