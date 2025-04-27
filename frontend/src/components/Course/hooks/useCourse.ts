import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, apiEndpoints } from '../../../config/apiConfig';
import {
  Course,
  CourseListResponse,
  CourseQueryParams,
  CourseReqDto,
  CourseType,
} from '../types/course.types';

// 현재 연도 설정
const FIXED_YEAR: number = new Date().getFullYear();

// Query Keys
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: CourseQueryParams) => [...courseKeys.lists(), params] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: number) => [...courseKeys.details(), id] as const,
};

// API 함수
const getCoursesByType = async (
  params: CourseQueryParams,
): Promise<Course[]> => {
  try {
    const { type, year, grade } = params;
    let url: string;

    // 연도는 항상 FIXED_YEAR 값을 사용
    const fixedYear = FIXED_YEAR;

    if (grade && type === 'BS') {
      // BS 과정의 특정 연도와 학년 조회
      url = apiEndpoints.course.listByTypeYearAndGrade(type, fixedYear, grade);
    } else {
      // 특정 연도 조회 (연도는 항상 고정)
      url = apiEndpoints.course.listByTypeAndYear(type, fixedYear);
    }

    const response = await axiosInstance.get<Course[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const getCourseById = async (id: number): Promise<Course> => {
  try {
    const response = await axiosInstance.get<Course>(
      apiEndpoints.course.get(id),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
};

const createCourse = async (courseData: CourseReqDto): Promise<Course> => {
  try {
    // 연도가 고정되었는지 확인
    const fixedCourseData = {
      ...courseData,
      year: FIXED_YEAR,
    };

    const response = await axiosInstance.post<Course>(
      apiEndpoints.course.create,
      fixedCourseData,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

const deleteCourse = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(apiEndpoints.course.delete(id));
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

const updateCourse = async (data: {
  id: number;
  courseData: CourseReqDto;
}): Promise<Course> => {
  try {
    const { id, courseData } = data;

    // 연도가 고정되었는지 확인
    const fixedCourseData = {
      ...courseData,
      year: FIXED_YEAR,
    };

    const response = await axiosInstance.post<Course>(
      apiEndpoints.course.update(id),
      fixedCourseData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Custom Hooks
export const useGetCoursesByType = (
  type: CourseType,
  year?: number,
  grade?: number,
) => {
  // 연도는 항상 FIXED_YEAR를 사용
  const fixedYear = FIXED_YEAR;

  return useQuery({
    queryKey: courseKeys.list({ type, year: fixedYear, grade }),
    queryFn: () => getCoursesByType({ type, year: fixedYear, grade }),
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });
};

export const useGetCourseById = (id: number) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => getCourseById(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 10 * 60 * 1000, // 10분간 데이터 유지
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: (_data, variables) => {
      // 성공 시 해당 타입의 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: courseKeys.list({ type: variables.courseType }),
      });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      // 성공 시 목록 쿼리 전체 무효화
      queryClient.invalidateQueries({
        queryKey: courseKeys.lists(),
      });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: (_data, variables) => {
      // 성공 시 해당 과목 상세 정보와 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.list({ type: variables.courseData.courseType }),
      });
    },
  });
};

export default {
  useGetCoursesByType,
  useGetCourseById,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
};
