import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Container } from '@mui/material';
import styled from 'styled-components';
import CourseTable from './components/CourseTable';
import CourseForm from './components/CourseForm';
import { Course, CourseType } from './types/course.types';

// 스타일 컴포넌트
const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const TabMenu = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TabContainer = styled(Container)`
  max-width: 1200px;
  width: 100%;
  padding: 0;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 0;
  width: 100%;

  & .MuiTabs-indicator {
    background-color: #cc0000;
    height: 3px;
    width: 100% !important;
  }

  & .MuiTabs-flexContainer {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledTab = styled(Tab)`
  font-weight: 600;
  font-size: 1.5rem !important;
  padding: 1.8rem 1rem;
  text-transform: none;
  flex-grow: 1;
  max-width: none;
  transition: all 0.3s ease;
  position: relative;

  &.Mui-selected {
    color: #cc0000;
    background-color: #ffffff;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    color: #cc0000;
  }

  /* 탭 구분선 추가 */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 25%;
    height: 50%;
    width: 1px;
    background-color: #e0e0e0;
  }
`;

// TabPanel 컴포넌트
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
};

// a11y 속성
function a11yProps(index: number) {
  return {
    id: `course-tab-${index}`,
    'aria-controls': `course-tabpanel-${index}`,
  };
}

// CourseManagement 컴포넌트
const CourseManagement: React.FC = () => {
  // 탭 상태 관리
  const [tabValue, setTabValue] = useState(0);

  // 과목 추가 모달 상태 관리
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 과목 수정 모달 상태 관리
  const [editCourse, setEditCourse] = useState<Course | undefined>(undefined);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  // 현재 선택된 과정 유형
  const courseType: CourseType = tabValue === 0 ? 'BS' : 'MS';

  // 탭 변경 핸들러
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 과목 추가 모달 열기 핸들러
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  // 과목 추가 모달 닫기 핸들러
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // 과목 수정 모달 열기 핸들러
  const handleEdit = (course: Course) => {
    setEditCourse(course);
    setIsEditFormOpen(true);
  };

  // 과목 수정 모달 닫기 핸들러
  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setEditCourse(undefined);
  };

  return (
    <Box>
      <TabMenu>
        <TabContainer maxWidth={false}>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="inherit"
            aria-label="교과과정 탭 메뉴"
            TabIndicatorProps={{
              style: {
                width: '100%',
                backgroundColor: '#cc0000',
              },
            }}
          >
            <StyledTab label="학부 교과과정" {...a11yProps(0)} />
            <StyledTab label="대학원 교과과정" {...a11yProps(1)} />
          </StyledTabs>
        </TabContainer>
      </TabMenu>

      <PageContainer maxWidth="lg">
        <TabPanel value={tabValue} index={0}>
          <CourseTable type="BS" onAdd={handleOpenForm} onEdit={handleEdit} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CourseTable type="MS" onAdd={handleOpenForm} onEdit={handleEdit} />
        </TabPanel>
      </PageContainer>

      {/* 과목 추가 모달 */}
      <CourseForm
        open={isFormOpen}
        onClose={handleCloseForm}
        defaultType={courseType}
      />

      {/* 과목 수정 모달 */}
      {editCourse && (
        <CourseForm
          open={isEditFormOpen}
          onClose={handleCloseEditForm}
          defaultType={editCourse.courseType}
          course={editCourse}
          mode="edit"
        />
      )}
    </Box>
  );
};

export default CourseManagement;
