// src/features/calendarReservation/components/Calendar/components/index.tsx
import React from 'react';
import { format } from 'date-fns';
import {
  CalendarToolbar as ToolbarContainer,
  NavigationButtons,
  TodayButton,
  ArrowButton,
  CurrentDate,
  ViewButtons,
  ViewButton,
} from '../styles';

type ViewMode = 'month' | 'week';

interface CalendarToolbarProps {
  selectedDate: Date;
  viewMode: ViewMode;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onViewModeChange: (mode: 'dayGridMonth' | 'timeGridWeek') => void;
}

const Index: React.FC<CalendarToolbarProps> = ({
  selectedDate,
  viewMode,
  onPrevMonth,
  onNextMonth,
  onToday,
  onViewModeChange,
}) => {
  return (
    <ToolbarContainer>
      <NavigationButtons>
        <ArrowButton onClick={onPrevMonth} aria-label="이전 달">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArrowButton>

        <TodayButton onClick={onToday}>오늘</TodayButton>

        <ArrowButton onClick={onNextMonth} aria-label="다음 달">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArrowButton>
      </NavigationButtons>

      <CurrentDate>{format(selectedDate, 'yyyy년 M월')}</CurrentDate>

      <ViewButtons>
        <ViewButton
          active={viewMode === 'month'}
          onClick={() => onViewModeChange('dayGridMonth')}
        >
          월
        </ViewButton>
        <ViewButton
          active={viewMode === 'week'}
          onClick={() => onViewModeChange('timeGridWeek')}
        >
          주
        </ViewButton>
      </ViewButtons>
    </ToolbarContainer>
  );
};

export default Index;
