import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { useGetCoursesByType, useDeleteCourse } from '../hooks/useCourse';
import { Course, CourseType } from '../types/course.types';
import CourseTableRow from './CourseTableRow';
import useAuth from '../../../hooks/useAuth';

// 테이블 컨테이너 스타일링
const CourseTableContainer = styled(TableContainer)`
  margin-top: 2rem;
  max-width: 100%;
  overflow-x: auto; /* 가로 스크롤 허용 */
` as typeof TableContainer;

// 테이블 헤더 셀 스타일링 - 너비 속성 추가
const TableHeadCell = styled(TableCell)<{
  minwidth?: string;
  maxwidth?: string;
}>`
  background-color: #f5f5f5;
  font-weight: 600;
  text-align: center;
  min-width: ${(props) => props.minwidth || '80px'};
  max-width: ${(props) => props.maxwidth || 'auto'};
  white-space: normal;
  word-wrap: break-word;
  position: sticky; /* 헤더 고정 */
  top: 0;
  z-index: 2;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

// 컨트롤 영역 스타일링
const ControlArea = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FilterArea = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TableTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
  width: 100%;
`;

// 로딩 인디케이터 컨테이너
const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

interface CourseTableProps {
  type: CourseType;
  onAdd?: () => void; // 과목 추가 버튼 클릭 시 호출될 함수
  onEdit?: (course: Course) => void; // 편집 핸들러 추가
}

const CourseTable: React.FC<CourseTableProps> = ({ type, onAdd, onEdit }) => {
  // 인증 정보 (관리자 확인용)
  const { isAdmin } = useAuth();

  // 학년 필터 상태 (BS만 해당)
  const [filterGrade, setFilterGrade] = useState<number | null>(null);

  // 항상 2025년으로 고정
  const fixedYear = 2025;

  // React Query 훅 사용
  const { data, isLoading, isError, refetch } = useGetCoursesByType(
    type,
    fixedYear, // 고정된 연도 사용
    filterGrade || undefined,
  );

  const deleteMutation = useDeleteCourse();

  // 학년 필터 변경 핸들러
  const handleGradeFilterChange = (e: SelectChangeEvent<number | string>) => {
    const value = e.target.value === 'all' ? null : (e.target.value as number);
    setFilterGrade(value);
  };

  // 필터 초기화 핸들러
  const handleResetFilters = () => {
    setFilterGrade(null);
  };

  // 과목 삭제 처리 함수
  const handleDelete = (id: number) => {
    if (window.confirm('정말 이 과목을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert('과목이 성공적으로 삭제되었습니다.');
          refetch(); // 데이터 다시 불러오기
        },
        onError: (error) => {
          console.error('과목 삭제 중 오류 발생:', error);
          alert('과목 삭제 중 오류가 발생했습니다.');
        },
      });
    }
  };

  // 편집 처리 함수
  const handleEdit = (course: Course) => {
    if (onEdit) {
      onEdit(course);
    }
  };

  // 테이블 헤더 생성 함수
  const renderTableHeader = () => {
    if (type === 'BS') {
      return (
        <TableRow>
          <TableHeadCell align="center" minwidth="80px">
            학년
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="80px">
            학기
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="100px">
            이수구분
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="100px">
            학수번호
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="150px" maxwidth="200px">
            교과목명
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="180px" maxwidth="250px">
            영문교과목명
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="80px">
            학점
          </TableHeadCell>
          {isAdmin && (
            <TableHeadCell align="center" minwidth="100px">
              관리
            </TableHeadCell>
          )}
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableHeadCell align="center" minwidth="80px">
            학기
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="100px">
            학수번호
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="150px" maxwidth="200px">
            교과목명
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="180px" maxwidth="250px">
            영문교과목명
          </TableHeadCell>
          <TableHeadCell align="center" minwidth="80px">
            학점
          </TableHeadCell>
          {isAdmin && (
            <TableHeadCell align="center" minwidth="100px">
              관리
            </TableHeadCell>
          )}
        </TableRow>
      );
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <Box>
        <Typography color="error">
          데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ControlArea>
        <Typography variant="h6" component="h2">
          {type === 'BS' ? '학부 교육과정' : '교육과정'}
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            과목 추가
          </Button>
        )}
      </ControlArea>

      {/* 필터 영역 - BS 타입일 때만 학년 필터 표시 */}
      {type === 'BS' && (
        <FilterArea>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="grade-filter-label">학년</InputLabel>
            <Select
              labelId="grade-filter-label"
              value={filterGrade || 'all'}
              onChange={handleGradeFilterChange}
              label="학년"
              displayEmpty
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value={1}>1학년</MenuItem>
              <MenuItem value={2}>2학년</MenuItem>
              <MenuItem value={3}>3학년</MenuItem>
              <MenuItem value={4}>4학년</MenuItem>
            </Select>
          </FormControl>

          {filterGrade !== null && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              sx={{ height: 'fit-content', alignSelf: 'center' }}
            >
              필터 초기화
            </Button>
          )}
        </FilterArea>
      )}

      <CourseTableContainer component={Paper}>
        <Table aria-label="curriculum table">
          <TableHead>{renderTableHeader()}</TableHead>
          <TableBody>
            {data?.map((course: Course, index: number) => (
              <CourseTableRow
                key={course.id || index}
                course={course}
                type={type}
                onDelete={isAdmin ? handleDelete : undefined}
                onEdit={isAdmin ? handleEdit : undefined}
              />
            ))}

            {(!data || data.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={type === 'BS' ? 8 : 7}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    등록된 과목이 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CourseTableContainer>
    </>
  );
};

export default CourseTable;
