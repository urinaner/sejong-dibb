import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Course, CourseType } from '../types/course.types';
import useAuth from '../../../hooks/useAuth';

// 테이블 행 스타일링
const StyledRow = styled(TableRow)`
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

// 클릭 가능한 테이블 행 스타일링
const ClickableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

// 상세 내용 컨테이너 스타일링
const DetailContainer = styled(Box)`
  border: 1px solid #e0e0e0;
  border-top: none;
  padding: 1rem;
  background-color: #fafafa;
  max-height: 400px; /* 상세 내용 최대 높이 제한 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 표시 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */
`;

// 상세 내용 헤더 스타일링
const DetailHeader = styled(Box)`
  border-bottom: 1px solid #c41230;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background-color: #fafafa;
  z-index: 1;
`;

// 테이블 셀의 사용자 정의 props 인터페이스 정의
interface StyledTableCellProps {
  minwidth?: string;
  maxwidth?: string;
  width?: string;
}

// 테이블 셀 스타일링 - 너비 고정 및 텍스트 처리
const StyledTableCell = styled(TableCell)<StyledTableCellProps>`
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
  padding: 10px; /* 패딩 크기 조정으로 셀 높이 일관성 유지 */
  min-width: ${(props) => props.minwidth || '80px'}; /* 최소 너비 설정 */
  max-width: ${(props) => props.maxwidth || 'auto'}; /* 최대 너비 설정 */
  width: ${(props) => props.minwidth || '80px'}; /* 너비 고정 */
`;

interface CourseTableRowProps {
  course: Course;
  type: CourseType; // 과정 유형 추가
  onDelete?: (id: number) => void;
  onEdit?: (course: Course) => void;
}

const CourseTableRow: React.FC<CourseTableRowProps> = ({
  course,
  type,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth(); // 관리자 권한 확인

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 행 클릭 이벤트가 발생하지 않도록 중지
    if (course.id && onDelete) {
      onDelete(course.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 행 클릭 이벤트가 발생하지 않도록 중지
    if (onEdit) {
      onEdit(course);
    }
  };

  // 행 클릭 핸들러 - BS 타입에만 상세 정보 토글 기능 적용
  const handleRowClick = () => {
    if (type === 'BS') {
      setOpen(!open);
    }
    // MS 타입은 클릭 시 아무 기능 없음
  };

  // 기본 정보를 표시하는 행 컴포넌트
  const MainRow = () => (
    <>
      {course.courseType === 'BS' && (
        <StyledTableCell align="center" minwidth="80px" width="80px">
          {course.grade}학년
        </StyledTableCell>
      )}

      {/* 공통 필드: 학기 */}
      <StyledTableCell align="center" minwidth="80px" width="80px">
        {course.semester}학기
      </StyledTableCell>

      {/* BS 과정일 경우 이수구분 표시 */}
      {course.courseType === 'BS' && (
        <StyledTableCell align="center" minwidth="100px" width="100px">
          {course.classification}
        </StyledTableCell>
      )}

      {/* 공통 필드: 학수번호 */}
      <StyledTableCell align="center" minwidth="100px" width="100px">
        {course.courseNumber}
      </StyledTableCell>

      {/* 공통 필드: 교과목명 */}
      <StyledTableCell align="center" minwidth="150px" width="150px">
        <Tooltip title={course.courseName} placement="top">
          <span>{course.courseName}</span>
        </Tooltip>
      </StyledTableCell>

      {/* 공통 필드: 영문교과목명 */}
      <StyledTableCell align="center" minwidth="180px" width="180px">
        <Tooltip title={course.courseNameEn} placement="top">
          <span>{course.courseNameEn}</span>
        </Tooltip>
      </StyledTableCell>

      {/* 공통 필드: 학점 */}
      <StyledTableCell align="center" minwidth="80px" width="80px">
        {course.creditTime}
      </StyledTableCell>

      {/* 관리자인 경우 관리 버튼 표시 */}
      {isAdmin && (
        <StyledTableCell align="center" minwidth="100px" width="100px">
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <IconButton size="small" color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </StyledTableCell>
      )}
    </>
  );

  return (
    <React.Fragment>
      {/* 타입에 따라 다른 행 컴포넌트 렌더링 */}
      {type === 'BS' ? (
        <ClickableRow onClick={handleRowClick}>
          <MainRow />
        </ClickableRow>
      ) : (
        <StyledRow>
          <MainRow />
        </StyledRow>
      )}

      {/* BS 타입에만 상세 정보 표시 영역 추가 */}
      {type === 'BS' && (
        <TableRow>
          <TableCell
            style={{ paddingTop: 0, paddingBottom: 0 }}
            colSpan={isAdmin ? 8 : 7}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <DetailContainer>
                <DetailHeader>
                  <Typography variant="subtitle1" fontWeight="bold">
                    교과목표
                  </Typography>
                </DetailHeader>
                {course.courseDescription || course.courseDescriptionEn ? (
                  <Box>
                    {course.courseDescription && (
                      <Box mb={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                          한글
                        </Typography>
                        <Box
                          sx={{
                            maxHeight: '200px',
                            overflow: 'auto',
                            borderRadius: '4px',
                            padding: '8px',
                          }}
                        >
                          <Typography
                            sx={{
                              wordBreak: 'break-word',
                              whiteSpace: 'pre-wrap',
                              margin: 0,
                            }}
                          >
                            {course.courseDescription}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    {course.courseDescriptionEn && (
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          영문
                        </Typography>
                        <Box
                          sx={{
                            maxHeight: '200px',
                            overflow: 'auto',
                            borderRadius: '4px',
                            padding: '8px',
                          }}
                        >
                          <Typography
                            sx={{
                              wordBreak: 'break-word',
                              whiteSpace: 'pre-wrap',
                              margin: 0,
                            }}
                          >
                            {course.courseDescriptionEn}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Typography paragraph color="text.secondary">
                    교과목표 정보가 없습니다.
                  </Typography>
                )}
              </DetailContainer>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default CourseTableRow;
