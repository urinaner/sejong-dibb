// components/Course/components/CourseForm.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import styled from 'styled-components';
import { useCreateCourse, useUpdateCourse } from '../hooks/useCourse';
import { Course, CourseReqDto, CourseType } from '../types/course.types';
import { SelectChangeEvent } from '@mui/material/Select';

// 스타일 컴포넌트
const FormPaper = styled.div`
  padding: 24px;
  margin-bottom: 24px;
`;

const FormTitle = styled(Typography)`
  margin-bottom: 16px;
  color: #333;
  font-weight: 600;
`;

const FormDivider = styled(Divider)`
  margin: 24px 0;
`;

// 항상 2025년으로 고정된 연도
const FIXED_YEAR = 2025;

// 초기 폼 데이터
const initialBSForm: CourseReqDto = {
  courseType: 'BS',
  courseNumber: '',
  courseName: '',
  courseNameEn: '',
  creditTime: '',
  year: FIXED_YEAR, // 고정된 연도 사용
  semester: 1,
  grade: 1,
  classification: '',
  courseDescription: '',
  courseDescriptionEn: '',
};

const initialMSForm: CourseReqDto = {
  courseType: 'MS',
  courseNumber: '',
  courseName: '',
  courseNameEn: '',
  creditTime: '',
  year: FIXED_YEAR, // 고정된 연도 사용
  semester: 1,
  courseDescription: '',
  courseDescriptionEn: '',
};

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  defaultType?: CourseType;
  course?: Course; // 수정할 경우 제공되는 과목 데이터
  mode?: 'create' | 'edit'; // 모드 구분
}

const CourseForm: React.FC<CourseFormProps> = ({
  open,
  onClose,
  defaultType = 'BS',
  course,
  mode = 'create',
}) => {
  // 과목 유형 상태
  const [courseType, setCourseType] = useState<CourseType>(
    course?.courseType || defaultType,
  );

  // 폼 데이터 상태
  const [formData, setFormData] = useState<CourseReqDto>(() => {
    if (course && mode === 'edit') {
      return {
        courseType: course.courseType,
        courseNumber: course.courseNumber,
        courseName: course.courseName,
        courseNameEn: course.courseNameEn,
        creditTime: course.creditTime,
        year: FIXED_YEAR, // 연도를 항상 2025로 고정
        semester: course.semester,
        grade: course.grade,
        classification: course.classification || '',
        courseDescription: course.courseDescription || '',
        courseDescriptionEn: course.courseDescriptionEn || '',
      };
    }
    return defaultType === 'BS' ? initialBSForm : initialMSForm;
  });

  // 유효성 검사 오류 상태
  const [errors, setErrors] = useState<Record<string, string>>({});

  // React Query Mutation 훅
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();

  // 입력 필드 변경 핸들러
  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | { name?: string | undefined; value: unknown }
        >
      | SelectChangeEvent<number>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  // 과목 유형 변경 핸들러
  const handleTypeChange = (e: SelectChangeEvent<CourseType>) => {
    const newType = e.target.value as CourseType;
    setCourseType(newType);

    // 유형에 따라 폼 초기화
    setFormData(newType === 'BS' ? initialBSForm : initialMSForm);
    setErrors({});
  };

  // 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 필수 필드 검사
    if (courseType === 'BS') {
      if (!formData.grade) newErrors.grade = '학년을 입력해주세요';
      if (!formData.classification)
        newErrors.classification = '이수구분을 입력해주세요';
    }

    // 공통 필수 필드
    if (!formData.courseNumber)
      newErrors.courseNumber = '학수번호를 입력해주세요';
    if (!formData.courseName) newErrors.courseName = '교과목명을 입력해주세요';
    if (!formData.courseNameEn)
      newErrors.courseNameEn = '영문 교과목명을 입력해주세요';
    if (!formData.creditTime) newErrors.creditTime = '학점을 입력해주세요';
    if (!formData.semester) newErrors.semester = '학기를 선택해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 연도를 항상 2025로 설정
    const submissionData = {
      ...formData,
      year: FIXED_YEAR,
    };

    if (mode === 'edit' && course?.id) {
      // 과목 수정 API 호출
      updateMutation.mutate(
        { id: course.id, courseData: submissionData },
        {
          onSuccess: () => {
            alert('과목이 성공적으로 수정되었습니다.');
            onClose(); // 모달 닫기
          },
          onError: (error) => {
            console.error('과목 수정 중 오류 발생:', error);
            alert('과목 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
          },
        },
      );
    } else {
      // 과목 생성 API 호출
      createMutation.mutate(submissionData, {
        onSuccess: () => {
          alert('과목이 성공적으로 생성되었습니다.');
          onClose(); // 모달 닫기
        },
        onError: (error) => {
          console.error('과목 생성 중 오류 발생:', error);
          alert('과목 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        },
      });
    }
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    const isPending =
      mode === 'edit' ? updateMutation.isPending : createMutation.isPending;

    if (isPending) {
      if (window.confirm('현재 작업 중입니다. 정말 취소하시겠습니까?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const getDialogTitle = () => {
    if (mode === 'edit') {
      return courseType === 'BS' ? '학부 과목 수정' : '대학원 과목 수정';
    }
    return courseType === 'BS' ? '학부 과목 추가' : '대학원 과목 추가';
  };

  const getSubmitButtonText = () => {
    if (mode === 'edit') {
      return updateMutation.isPending ? '수정 중...' : '수정';
    }
    return createMutation.isPending ? '저장 중...' : '저장';
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{getDialogTitle()}</DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-type-label">과정 유형</InputLabel>
            <Select
              labelId="course-type-label"
              name="courseType"
              value={courseType}
              onChange={handleTypeChange}
              label="과정 유형"
            >
              <MenuItem value="BS">학부</MenuItem>
              <MenuItem value="MS">대학원</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* 학기 선택 필드 */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="semester-label">학기</InputLabel>
                <Select
                  labelId="semester-label"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  label="학기"
                  error={!!errors.semester}
                >
                  <MenuItem value={1}>1학기</MenuItem>
                  <MenuItem value={2}>2학기</MenuItem>
                </Select>
                {errors.semester && (
                  <Typography color="error" variant="caption">
                    {errors.semester}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* BS 과정일 경우 학년 및 이수구분 필드 표시 */}
            {courseType === 'BS' && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="grade-label">학년</InputLabel>
                    <Select
                      labelId="grade-label"
                      name="grade"
                      value={formData.grade || ''}
                      onChange={handleChange}
                      label="학년"
                      error={!!errors.grade}
                    >
                      <MenuItem value={1}>1학년</MenuItem>
                      <MenuItem value={2}>2학년</MenuItem>
                      <MenuItem value={3}>3학년</MenuItem>
                      <MenuItem value={4}>4학년</MenuItem>
                    </Select>
                    {errors.grade && (
                      <Typography color="error" variant="caption">
                        {errors.grade}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="이수구분"
                    name="classification"
                    value={formData.classification || ''}
                    onChange={handleChange}
                    placeholder="예: 전선, 전필"
                    error={!!errors.classification}
                    helperText={errors.classification}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="학수번호"
                name="courseNumber"
                value={formData.courseNumber}
                onChange={handleChange}
                placeholder="예: 010924"
                error={!!errors.courseNumber}
                helperText={errors.courseNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="학점"
                name="creditTime"
                value={formData.creditTime}
                onChange={handleChange}
                placeholder="예: 3"
                error={!!errors.creditTime}
                helperText={errors.creditTime}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="교과목명"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                error={!!errors.courseName}
                helperText={errors.courseName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="영문 교과목명"
                name="courseNameEn"
                value={formData.courseNameEn}
                onChange={handleChange}
                error={!!errors.courseNameEn}
                helperText={errors.courseNameEn}
              />
            </Grid>

            <Grid item xs={12}>
              <FormDivider />
              <Typography variant="subtitle1" gutterBottom>
                교과목표 (선택사항)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="교과목표 (한글)"
                name="courseDescription"
                value={formData.courseDescription || ''}
                onChange={handleChange}
                multiline
                rows={4}
                inputProps={{ maxLength: 2000 }}
                helperText={`${formData.courseDescription?.length || 0}/2000자`}
                sx={{
                  '& .MuiInputBase-root': {
                    maxHeight: '200px',
                    overflow: 'auto',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="교과목표 (영문)"
                name="courseDescriptionEn"
                value={formData.courseDescriptionEn || ''}
                onChange={handleChange}
                multiline
                rows={4}
                inputProps={{ maxLength: 2000 }}
                helperText={`${formData.courseDescriptionEn?.length || 0}/2000자`}
                sx={{
                  '& .MuiInputBase-root': {
                    maxHeight: '200px',
                    overflow: 'auto',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={
            mode === 'edit'
              ? updateMutation.isPending
              : createMutation.isPending
          }
        >
          {getSubmitButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseForm;
