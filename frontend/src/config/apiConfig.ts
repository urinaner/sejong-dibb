import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
// axios 인스턴스 생성
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CORS 요청에서 쿠키 전송 허용
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // XSRF-TOKEN 쿠키가 있다면 헤더에 추가
    const xsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 에러 처리
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
export interface NewsReqDto {
  title: string;
  content: string;
  link: string;
  image: string;
  createDate: string;
}

export interface BoardReqDto {
  title: string;
  content: string;
  writer: string;
  category: string;
  fileList?: string[];
  departmentId: 1;
  createDate: string;
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

export interface ProfessorReqDto {
  id?: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}

interface ThesisEndpoint {
  url: string | ((id: string) => string);
  getFormData: (thesisReqDto: ThesisReqDto, file?: File | null) => FormData;
}

export interface SeminarDto {
  id?: number;
  name: string;
  writer: string;
  place: string;
  startTime: string;
  endTime: string;
  speaker: string;
  company: string;
}

export const apiEndpoints = {
  news: {
    list: `${API_URL}/api/news`,
    listWithPage: (page: number, size: number) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      return `${API_URL}/api/news?${params.toString()}`;
    },
    create: {
      url: `${API_URL}/api/news`,
      getFormData: (newsReqDto: NewsReqDto, imageFile?: File | null) => {
        const formData = new FormData();
        formData.append(
          'newsReqDto',
          new Blob([JSON.stringify(newsReqDto)], {
            type: 'application/json',
          }),
        );
        if (imageFile) {
          formData.append('news_image', imageFile);
        }
        return formData;
      },
    },
    get: (newsId: string | number) => `${API_URL}/api/news/${newsId}`,
    update: {
      url: (newsId: string | number) => `${API_URL}/api/news/${newsId}`,
      getFormData: (newsReqDto: NewsReqDto, imageFile?: File | null) => {
        const formData = new FormData();
        formData.append(
          'newsReqDto',
          new Blob([JSON.stringify(newsReqDto)], {
            type: 'application/json',
          }),
        );
        if (imageFile) {
          formData.append('news_image', imageFile);
        }
        return formData;
      },
    },
    delete: (newsId: string | number) => `${API_URL}/api/news/${newsId}`,
  },

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
        formData.append('thesisReqDto', JSON.stringify(thesisReqDto));
        if (imageFile) {
          formData.append('thesis_image', imageFile);
        }
        return formData;
      },
    },
    get: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
    update: {
      url: (id: string) => `${API_URL}/api/thesis/${id}`,
      getFormData: (thesisReqDto: ThesisReqDto, file?: File | null) => {
        const formData = new FormData();
        formData.append(
          'thesisReqDto',
          new Blob([JSON.stringify(thesisReqDto)], {
            type: 'application/json',
          }),
        );
        if (file) {
          formData.append('thesis_image', file);
        }
        return formData;
      },
    } as ThesisEndpoint,
    delete: (thesisId: string) => `${API_URL}/api/thesis/${thesisId}`,
  },

  professor: {
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
    create: {
      url: `${API_URL}/api/professor`,
      getFormData: (
        professorReqDto: ProfessorReqDto,
        imageFile?: File | null,
      ) => {
        const formData = new FormData();
        formData.append(
          'professorReqDto',
          new Blob([JSON.stringify(professorReqDto)], {
            type: 'application/json',
          }),
        );
        if (imageFile) {
          formData.append('profileImage', imageFile);
        }
        return formData;
      },
    },
    update: {
      url: (id: number) => `${API_URL}/api/professor/${id}`,
      getFormData: (
        professorReqDto: ProfessorReqDto,
        imageFile?: File | null,
      ) => {
        const formData = new FormData();
        formData.append(
          'professorReqDto',
          new Blob([JSON.stringify(professorReqDto)], {
            type: 'application/json',
          }),
        );
        if (imageFile) {
          formData.append('profile_image', imageFile);
        }
        return formData;
      },
    },
    get: (professorId: number | string) =>
      `${API_URL}/api/professor/${professorId}`,
    delete: (professorId: number | string) =>
      `${API_URL}/api/professor/${professorId}`,

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

    detail: (professorId: number) => `${API_URL}/api/professor/${professorId}`,
  },

  admin: {
    login: `${API_URL}/api/admin/login`,
    signOut: `${API_URL}/api/admin/signOut`,
    register: `${API_URL}/api/admin/join`,
  },

  user: {
    login: `${API_URL}/api/user/login`,
    signOut: `${API_URL}/logout`,
    register: `${API_URL}/register`,
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
    download: `${API_URL}/api/board/download`,
    listWithPage: (page: number, size: number) =>
      `${API_URL}/api/board?page=${page}&size=${size}`,
    create: {
      url: `${API_URL}/api/board`,
      getFormData: (boardReqDto: BoardReqDto, files: File[]) => {
        const formData = new FormData();
        formData.append(
          'boardReqDto',
          JSON.stringify({
            title: boardReqDto.title,
            content: boardReqDto.content,
            writer: boardReqDto.writer,
            createDate: boardReqDto.createDate,
            category: boardReqDto.category,
            departmentId: 1,
          }),
        );
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

  seminar: {
    list: `${API_URL}/api/seminar`,
    listWithPage: (page: number, size: number, sortDirection?: string) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (sortDirection) {
        params.append('sortDirection', sortDirection);
      }
      return `${API_URL}/api/seminar?${params.toString()}`;
    },
    get: (seminarId: string | number) => `${API_URL}/api/seminar/${seminarId}`,
    create: `${API_URL}/api/seminar`,
    update: (seminarId: string | number) =>
      `${API_URL}/api/seminar/${seminarId}`,
    delete: (seminarId: string | number) =>
      `${API_URL}/api/seminar/${seminarId}`,
  },
};

export default API_URL;
