import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import CourseTable from '../../../components/Course/components/CourseTable';
import {
  CourseType,
  Course,
} from '../../../components/Course/types/course.types';
import CourseForm from '../../../components/Course/components/CourseForm';

const SectionContainer = styled(Box)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const InfoPanel = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1rem 0;
  position: relative;
`;

const PanelNavigation = styled(Box)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

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

const AdmissionSection: React.FC = () => {
  // 선택된 과정 유형 상태 관리 (BS로 변경)
  const [courseType, setCourseType] = useState<CourseType>('BS');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined,
  );

  // 과목 추가 버튼 클릭 시, 해당 경로로 이동
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
      {/* 과목 추가 버튼 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '1rem',
        }}
      ></Box>

      {/* 정보 패널 컨테이너 */}
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {/* 주전공 패널 */}
        <InfoPanel sx={{ flex: '1 1 45%', minWidth: '300px' }}>
          <PanelNavigation>
            <NavButton aria-label="previous">&#x3C;</NavButton>
            <NavButton aria-label="next">&#x3E;</NavButton>
          </PanelNavigation>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            주전공
          </Typography>
          <BulletList>
            <BulletItem>총 학점 : 60학점 이상</BulletItem>
            <BulletItem>전공필수과목 : 21학점</BulletItem>
            <BulletItem>전공선택과목 : 39학점 이상 이수해야 함.</BulletItem>
          </BulletList>
        </InfoPanel>

        {/* 복수전공/부전공 패널 */}
        <InfoPanel sx={{ flex: '1 1 45%', minWidth: '300px' }}>
          <PanelNavigation>
            <NavButton aria-label="previous">&#x3C;</NavButton>
            <NavButton aria-label="next">&#x3E;</NavButton>
          </PanelNavigation>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            복수전공
          </Typography>
          <BulletList>
            <BulletItem>총 학점 : 39학점 이상</BulletItem>
            <BulletItem>전공필수과목 : 15학점</BulletItem>
            <BulletItem>전공선택과목 : 24학점 이상 이수해야 함.</BulletItem>
          </BulletList>
          <br />
          <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
            부전공
          </Typography>
          <BulletList>
            <BulletItem>
              총 학점 : 양자원자력공학과로부터 전공 중 21학점 이상 이수
            </BulletItem>
          </BulletList>
        </InfoPanel>
      </Box>

      {/* 교육과정 테이블 - CourseTable 컴포넌트로 교체 (BS 타입으로 변경) */}
      <CourseTable type="BS" onAdd={handleOpenForm} onEdit={handleEditCourse} />

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

export default AdmissionSection;
