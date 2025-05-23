import axios, { AxiosInstance } from 'axios';

// 환경에 따른 baseURL 설정
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '' // 프로덕션 환경에서는 상대 경로를 위해 빈 문자열 사용
    : process.env.REACT_APP_API_URL;
// axios 인스턴스 생성
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const xsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    // // 프로덕션 환경에서 URL 처리
    // if (process.env.NODE_ENV === 'production' && config.url) {
    //   // URL이 이미 절대 경로(/로 시작)가 아닌 경우에만 /api 추가
    //   if (!config.url.startsWith('/')) {
    //     config.url = `${config.url}`;
    //   }
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const publicAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// DTO 인터페이스 정의
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
  title: string;
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
  departmentId: number;
  academicBackground: string;
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

const createEndpoint = (path: string) => {
  return `${BASE_URL}${path}`;
};

// API Endpoints
export const apiEndpoints = {
  news: {
    search: '/api/news/search',
    list: createEndpoint('/api/news'),
    listWithPage: (page: number, size: number) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      return createEndpoint(`/api/news?${params.toString()}`);
    },
    create: {
      url: createEndpoint('/api/news'),
      getFormData: (newsReqDto: NewsReqDto, imageFile?: File | null) => {
        const formData = new FormData();
        formData.append(
          'newsReqDto',
          new Blob([JSON.stringify(newsReqDto)], {
            type: 'multipart/form-data',
          }),
        );
        if (imageFile) {
          formData.append('news_image', imageFile);
        }
        return formData;
      },
    },
    get: (newsId: string | number) => createEndpoint(`/api/news/${newsId}`),
    update: {
      url: (newsId: string | number) => createEndpoint(`/api/news/${newsId}`),
      getFormData: (newsReqDto: NewsReqDto, imageFile?: File | null) => {
        const formData = new FormData();
        formData.append(
          'newsReqDto',
          new Blob([JSON.stringify(newsReqDto)], {
            type: 'multipart/form-data',
          }),
        );
        if (imageFile) {
          formData.append('news_image', imageFile);
        }
        return formData;
      },
    },
    delete: (newsId: string | number) => createEndpoint(`/api/news/${newsId}`),
  },

  thesis: {
    search: '/api/thesis/search',
    list: createEndpoint('/api/thesis'),
    listWithPage: (page: number, size: number, sort?: string[]) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (sort && sort.length > 0) {
        sort.forEach((sortItem) => params.append('sort', sortItem));
      }
      return createEndpoint(`/api/thesis?${params.toString()}`);
    },
    create: {
      url: createEndpoint('/api/thesis'),
      getFormData: (thesisReqDto: ThesisReqDto, imageFile?: File | null) => {
        const formData = new FormData();
        formData.append('thesisReqDto', JSON.stringify(thesisReqDto));
        if (imageFile) {
          formData.append('thesis_image', imageFile);
        }
        return formData;
      },
    },
    get: (thesisId: string) => createEndpoint(`/api/thesis/${thesisId}`),
    update: {
      url: (id: string) => createEndpoint(`/api/thesis/${id}`),
      getFormData: (thesisReqDto: ThesisReqDto, file?: File | null) => {
        const formData = new FormData();
        formData.append(
          'thesisReqDto',
          new Blob([JSON.stringify(thesisReqDto)], {
            type: 'multipart/form-data',
          }),
        );
        if (file) {
          formData.append('thesis_image', file);
        }
        return formData;
      },
    } as ThesisEndpoint,
    delete: (thesisId: string) => createEndpoint(`/api/thesis/${thesisId}`),
  },
  professor: {
    search: '/api/professor/search',
    list: createEndpoint('/api/professor'),
    listWithPage: (page: number, size: number, sort?: string[]) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (sort && sort.length > 0) {
        sort.forEach((sortItem) => params.append('sort', sortItem));
      }
      return createEndpoint(`/api/professor?${params.toString()}`);
    },
    create: {
      url: createEndpoint('/api/professor'),
      getFormData: (
        professorReqDto: ProfessorReqDto,
        imageFile?: File | null,
      ) => {
        const formData = new FormData();

        // JSON 데이터를 문자열 그대로 추가
        if (professorReqDto) {
          formData.append('professorReqDto', JSON.stringify(professorReqDto));
        }

        // 이미지 파일 추가
        if (imageFile) {
          formData.append('profileImage', imageFile);
        }

        return formData;
      },
    },
    update: {
      url: (id: number) => createEndpoint(`/api/professor/${id}`),
      getFormData: (
        professorReqDto: ProfessorReqDto,
        imageFile?: File | null,
      ) => {
        const formData = new FormData();
        // JSON 데이터를 문자열 그대로 추가
        if (professorReqDto) {
          formData.append('professorReqDto', JSON.stringify(professorReqDto));
        }
        // 이미지 파일 추가 (이전 `profile_image` → `profileImage`로 통일)
        if (imageFile) {
          formData.append('profileImage', imageFile);
        }
        return formData;
      },
    },
    get: (professorId: number | string) =>
      createEndpoint(`/api/professor/${professorId}`),
    delete: (professorId: number | string) =>
      createEndpoint(`/api/professor/${professorId}`),
    thesis: {
      search: '/api/thesis/search',
      base: createEndpoint('/api/thesis'),
      list: createEndpoint('/api/thesis'),
      listWithPage: (page: number, size: number, sort?: string[]) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });
        if (sort && sort.length > 0) {
          sort.forEach((sortItem) => params.append('sort', sortItem));
        }
        return createEndpoint(`/api/thesis?${params.toString()}`);
      },
      create: createEndpoint('/api/thesis'),
      get: (thesisId: number | string) =>
        createEndpoint(`/api/thesis/${thesisId}`),
      update: (thesisId: number | string) =>
        createEndpoint(`/api/thesis/${thesisId}`),
      delete: (thesisId: number | string) =>
        createEndpoint(`/api/thesis/${thesisId}`),
    },
    detail: (professorId: number) =>
      createEndpoint(`/api/professor/${professorId}`),
  },
  admin: {
    login: createEndpoint('/api/admin/login'),
    signOut: createEndpoint('/api/admin/signOut'),
    register: createEndpoint('/api/admin/join'),
  },
  user: {
    login: createEndpoint('/api/user/login'),
    signOut: createEndpoint('/api/logout'),
    register: createEndpoint('/api/register'),
  },
  department: {
    get: (id: string) => createEndpoint(`/api/departments/${id}`),
    update: (id: string) => createEndpoint(`/api/departments/${id}`),
    delete: (id: string) => createEndpoint(`/api/departments/${id}`),
    create: createEndpoint('/api/departments'),
  },
  main: {
    get: createEndpoint('/api/'),
  },

  board: {
    search: '/api/board/search', // 검색 API 경로 추가
    base: createEndpoint('/api/board'),
    download: createEndpoint('/api/board/download'),
    listWithPage: (page: number, size: number) =>
      createEndpoint(`/api/board?page=${page}&size=${size}`),
    create: {
      url: createEndpoint('/api/board'),
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
    get: (boardId: string) => createEndpoint(`/api/board/${boardId}`),
    update: (boardId: string) => createEndpoint(`/api/board/${boardId}`),
    delete: (boardId: string) => createEndpoint(`/api/board/${boardId}`),
    getByCategory: (
      category: string,
      page: number,
      size: number,
      sortDirection: string,
    ) =>
      createEndpoint(
        `/api/board/category/${category}?page=${page}&size=${size}&sortDirection=${sortDirection}`,
      ),
  },

  seminar: {
    search: '/api/seminar/search', // 검색 API 경로 추가
    list: createEndpoint('/api/seminar'),
    listWithPage: (page: number, size: number, sortDirection?: string) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (sortDirection) {
        params.append('sortDirection', sortDirection);
      }
      return createEndpoint(`/api/seminar?${params.toString()}`);
    },
    get: (seminarId: string | number) =>
      createEndpoint(`/api/seminar/${seminarId}`),
    create: createEndpoint('/api/seminar'),
    update: (seminarId: string | number) =>
      createEndpoint(`/api/seminar/${seminarId}`),
    delete: (seminarId: string | number) =>
      createEndpoint(`/api/seminar/${seminarId}`),
  },
  member: {
    login: createEndpoint('/api/member/login'),
    logout: createEndpoint('/api/member/logout'),
  },

  reservation: {
    list: createEndpoint('/api/room'),
    monthlyList: (roomId: number, yearMonth: string) =>
      createEndpoint(
        `/api/room/${roomId}/reservation/month?yearMonth=${yearMonth}`,
      ),
    dailyList: (roomId: number, date: string) =>
      createEndpoint(`/api/room/${roomId}/reservation?date=${date}`),
    create: (roomId: number) =>
      createEndpoint(`/api/room/${roomId}/reservation`),
    get: (roomId: number, reservationId: number) =>
      createEndpoint(`/api/room/${roomId}/reservation/${reservationId}`),
    update: (roomId: number, reservationId: number) =>
      createEndpoint(`/api/room/${roomId}/reservation/${reservationId}`),
    delete: (roomId: number, reservationId: number) =>
      createEndpoint(`/api/room/${roomId}/reservation/${reservationId}`),
  },
  course: {
    // 과정 유형별 목록 조회 (BS 또는 MS)
    listByType: (type: string) => {
      return createEndpoint(`/api/course/type/${type}`);
    },

    // 과정 유형 + 연도별 목록 조회
    listByTypeAndYear: (type: string, year: number) => {
      return createEndpoint(`/api/course/type/${type}/${year}`);
    },

    // 과정 유형 + 연도 + 학년별 목록 조회 (BS만 해당)
    listByTypeYearAndGrade: (type: string, year: number, grade: number) => {
      return createEndpoint(`/api/course/type/${type}/${year}/${grade}`);
    },

    // 단일 과목 조회
    get: (courseId: number | string) =>
      createEndpoint(`/api/course/${courseId}`),

    // 과목 생성
    create: createEndpoint('/api/course'),

    // 과목 삭제
    delete: (courseId: number | string) =>
      createEndpoint(`/api/course/${courseId}`),

    // 과목 수정
    update: (courseId: number | string) =>
      createEndpoint(`/api/course/${courseId}`),
  },
};

export default BASE_URL;
