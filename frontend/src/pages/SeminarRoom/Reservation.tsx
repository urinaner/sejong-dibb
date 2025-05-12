import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Container } from '@mui/material';
import styled from 'styled-components';
import Calendar from '../../features/calendarReservation/components/Calendar';

// 스타일 컴포넌트
const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 1440px;
`;

const TabMenu = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TabContainer = styled(Box)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 0;
  width: 100%;

  & .MuiTabs-indicator {
    background-color: #cc0000;
    height: 3px;
  }

  & .MuiTabs-flexContainer {
    display: flex;
    justify-content: center;
  }
`;

const StyledTab = styled(Tab)`
  font-weight: 600;
  font-size: 1.3rem !important;
  padding: 1.5rem 2.5rem;
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

  /* 각 탭에 구분선 추가 */
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

const PageTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #333;
  border-left: 5px solid #cc0000;
  padding-left: 1rem;
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
      id={`reservation-tabpanel-${index}`}
      aria-labelledby={`reservation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
};

// a11y 속성
function a11yProps(index: number) {
  return {
    id: `reservation-tab-${index}`,
    'aria-controls': `reservation-tabpanel-${index}`,
  };
}

// 메인 컴포넌트
const Reservation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabMenu>
        <TabContainer>
          <StyledTabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            aria-label="예약 시스템 탭 메뉴"
            centered
          >
            <StyledTab label="세미나실 예약" {...a11yProps(0)} />
            <StyledTab label="실험 장비 예약" {...a11yProps(1)} />
          </StyledTabs>
        </TabContainer>
      </TabMenu>

      <PageContainer maxWidth={false}>
        <TabPanel value={value} index={0}>
          <Calendar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Calendar />
        </TabPanel>
      </PageContainer>
    </Box>
  );
};

export default Reservation;
