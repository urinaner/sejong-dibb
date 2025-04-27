import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import CourseForm from '../../components/Course/components/CourseForm';
import { CourseType, Course } from '../../components/Course/types/course.types';
import CourseTable from '../../components/Course/components/CourseTable';
import { useNavigate } from 'react-router-dom';

// 컨테이너 스타일링
const SectionContainer = styled(Box)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

// 정보 패널 스타일링
const InfoPanel = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1rem 0;
  position: relative;
`;

// 패널 네비게이션 스타일링
const PanelNavigation = styled(Box)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

// 네비게이션 버튼 스타일링
const NavButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 불릿 리스트 스타일링
const BulletList = styled.ul`
  padding-left: 1.5rem;
  margin: 0.5rem 0;
`;

// 불릿 아이템 스타일링
const BulletItem = styled.li`
  margin: 0.5rem 0;
`;

// 다운로드 버튼 스타일링
const DownloadButton = styled(Button)`
  padding: 4px 12px;
  font-size: 0.85rem;
  text-transform: none;
  background-color: #c41230;
  color: white;
  &:hover {
    background-color: #a01029;
  }
`;

const Graduate: React.FC = () => {
  const navigate = useNavigate();

  // 학과내규 PDF 파일 경로
  const departmentRulesPath =
    '/files/세종대학교_양자원자력공학과_학과내규_20190222.pdf';

  // PDF 새 창에서 열기 핸들러 함수
  const handleViewRules = () => {
    window.open(departmentRulesPath, '_blank');
  };

  // 상태 관리 (MS로 변경)
  const [courseType, setCourseType] = useState<CourseType>('MS');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined,
  );

  // 과목 추가 모달 열기 핸들러
  const handleOpenForm = () => {
    setFormMode('create');
    setSelectedCourse(undefined);
    setIsFormOpen(true);
  };

  // 과목 수정 모달 열기 핸들러
  const handleEditCourse = (course: Course) => {
    setFormMode('edit');
    setSelectedCourse(course);
    setIsFormOpen(true);
  };

  // 과목 추가/수정 모달 닫기 핸들러
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <SectionContainer>
      {/* 정보 패널 컨테이너 */}
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* 이수학점 패널 */}
        <InfoPanel sx={{ flex: '1 1 45%', minWidth: '300px' }}>
          <PanelNavigation>
            <NavButton aria-label="previous">&#x3C;</NavButton>
            <NavButton aria-label="next">&#x3E;</NavButton>
          </PanelNavigation>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            이수학점
          </Typography>
          <BulletList>
            <BulletItem>석사과정 : 최저 24학점이상</BulletItem>
            <BulletItem>박사과정 : 최저 36학점이상</BulletItem>
            <BulletItem>
              석/박사통합과정 : 최저 45학점 이상 이수해야 함.
            </BulletItem>
          </BulletList>
        </InfoPanel>

        {/* 종합시험과목 패널 */}
        <InfoPanel sx={{ flex: '1 1 45%', minWidth: '300px' }}>
          <PanelNavigation>
            <NavButton aria-label="previous">&#x3C;</NavButton>
            <NavButton aria-label="next">&#x3E;</NavButton>
          </PanelNavigation>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            종합시험과목
          </Typography>
          <BulletList>
            <BulletItem>
              석사과정 : 이수한 전공과목 또는 이수 중인 과목 중 2과목 선택
            </BulletItem>
            <BulletItem>
              석/박사, 박사과정 : 이수한 전공과목 또는 이수 중인 과목 중 3과목
              선택
            </BulletItem>
          </BulletList>

          {/*  <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>*/}
          {/*    그 외 기타사항*/}
          {/*  </Typography>*/}
          {/*  <BulletList>*/}
          {/*    <BulletItem>*/}
          {/*      학과내규 참조*/}
          {/*      <span style={{ display: 'inline-block', marginLeft: '8px' }}>*/}
          {/*        <Button*/}
          {/*          onClick={handleViewRules}*/}
          {/*          startIcon={<DownloadIcon />}*/}
          {/*          variant="contained"*/}
          {/*          size="small"*/}
          {/*          sx={{*/}
          {/*            padding: '4px 12px',*/}
          {/*            fontSize: '0.85rem',*/}
          {/*            textTransform: 'none',*/}
          {/*            backgroundColor: '#c41230',*/}
          {/*            color: 'white',*/}
          {/*            '&:hover': { backgroundColor: '#a01029' },*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          학과 내규 바로보기*/}
          {/*        </Button>*/}
          {/*      </span>*/}
          {/*    </BulletItem>*/}
          {/*  </BulletList>*/}
        </InfoPanel>
      </Box>

      <CourseTable type="MS" onAdd={handleOpenForm} onEdit={handleEditCourse} />

      {/* 과목 추가/수정 모달 */}
      <CourseForm
        open={isFormOpen}
        onClose={handleCloseForm}
        defaultType={courseType}
        course={selectedCourse}
        mode={formMode}
      />
    </SectionContainer>
  );
};

export default Graduate;
