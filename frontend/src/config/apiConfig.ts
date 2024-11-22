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
      base: `${API_URL}/api/thesis`,
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
      get: (thesisId: number | string) => `${API_URL}/api/thesis/${thesisId}`,
      update: (thesisId: number | string) =>
        `${API_URL}/api/thesis/${thesisId}`,
      delete: (thesisId: number | string) =>
        `${API_URL}/api/thesis/${thesisId}`,
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
  user: {
    login: `${API_URL}/api/user/login`,
    signOut: `${API_URL}/api/user/signOut`,
    register: `${API_URL}/api/user/join`,
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
  // 임시 URI 지정
  upload: {
    // 단일 이미지 업로드
    image: `${API_URL}/api/upload/image`,
    // 다중 이미지 업로드
    images: `${API_URL}/api/upload/images`,
    // 파일 업로드
    file: `${API_URL}/api/upload/file`,
    // 다중 파일 업로드
    files: `${API_URL}/api/upload/files`,
    // S3 signed URL 요청
    getSignedUrl: (fileName: string) =>
      `${API_URL}/api/upload/signed-url?fileName=${encodeURIComponent(fileName)}`,
    // 파일 삭제
    delete: (fileId: string) => `${API_URL}/api/upload/${fileId}`,
  },
};

export default API_URL;
