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
    create: {
      url: `${API_URL}/api/thesis`,
      getFormData: (thesisReqDto: ThesisReqDto, imageFile?: File | null) => {
        const formData = new FormData();

        // thesisReqDto를 JSON 문자열로 변환하여 추가
        formData.append(
          'thesisReqDto',
          new Blob([JSON.stringify(thesisReqDto)], {
            type: 'application/json',
          }),
        );

        // thesis_image 추가
        if (imageFile) {
          formData.append('thesis_image', imageFile);
        }

        return formData;
      },
    },
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
    create: {
      url: `${API_URL}/api/board`,
      // API 명세에 맞게 요청 형식 지정
      getFormData: (boardReqDto: BoardReqDto, files: File[]) => {
        const formData = new FormData();

        // boardReqDto를 JSON 문자열로 변환하여 추가
        formData.append(
          'boardReqDto',
          JSON.stringify({
            title: boardReqDto.title,
            content: boardReqDto.content,
            writer: boardReqDto.writer,
            fileList: files.map((file) => file.name),
            category: boardReqDto.category,
          }),
        );

        // boardFiles 추가
        files.forEach((file) => {
          formData.append('boardFiles', file);
        });

        return formData;
      },
    },
    get: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    update: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    delete: (boardId: string) => `${API_URL}/api/board/${boardId}`,
    getByCategory: (category: string, page: number, size: number) =>
      `${API_URL}/api/board/category/${category}?page=${page}&size=${size}`,
  },
};

export interface BoardReqDto {
  title: string;
  content: string;
  writer: string;
  category: string;
  fileList?: string[];
}

export interface ThesisReqDto {
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
  thesisImage: string;
  publicationCollection: string;
  publicationIssue: string;
  publicationPage: string;
  issn: string;
  professorId: number;
}

export default API_URL;
