// src/features/calendarReservation/components/Calendar/components/CalendarToolbar/index.tsx
import React from 'react';
import { format } from 'date-fns';
import { Button, IconButton, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useModal } from '../../../../../../components/Modal';
import ReservationForm from '../ReservationForm';
import useAuth from '../../../../../../hooks/useAuth';

// 스타일드 컴포넌트
const ToolbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  paddingTop: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
}));

const ViewButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
  },
}));
const ViewButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  minWidth: 0,
  padding: theme.spacing(0.75, 2),
  flex: 1,
  fontSize: 14,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active
    ? theme.palette.primary.contrastText
    : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: active
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    padding: theme.spacing(0.5, 1),
  },
}));

type ViewMode = 'month' | 'week';

interface CalendarToolbarProps {
  selectedDate: Date;
  viewMode: ViewMode;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onViewModeChange: (mode: 'dayGridMonth' | 'timeGridWeek') => void;
}
const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  selectedDate,
  viewMode,
  onPrevMonth,
  onNextMonth,
  onToday,
  onViewModeChange,
}) => {
  const { openModal, closeModal } = useModal();
  const { isAuthenticated, isAdmin } = useAuth();

  const hasPermission = (
    action: 'create' | 'read' | 'update' | 'delete',
  ): boolean => {
    if (!isAuthenticated) return false;
    if (action === 'read') return true;
    if (isAdmin) return true;
    return !isAdmin && action === 'create';
  };

  const handleNewReservation = () => {
    const startTime = format(selectedDate, 'yyyy-MM-dd') + 'T09:00:00';
    const endTime = format(selectedDate, 'yyyy-MM-dd') + 'T10:00:00';

    openModal(
      <ReservationForm
        roomId={1}
        startTime={startTime}
        endTime={endTime}
        onSave={() => closeModal()}
        onClose={closeModal}
      />,
    );
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        '@media (min-width: 600px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          textAlign: 'left',
        },
      }}
    >
      {/* 날짜 및 이동 버튼 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <IconButton onClick={onPrevMonth} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Button
          variant="outlined"
          size="small"
          startIcon={<CalendarTodayIcon />}
          onClick={onToday}
        >
          오늘
        </Button>

        <IconButton onClick={onNextMonth} size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 현재 날짜 타이틀 */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
        }}
      >
        {format(selectedDate, 'yyyy년 M월')}
      </Typography>

      {/* 보기 전환 + 예약 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          width: { xs: '100%', sm: 'auto' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <ViewButton
            size="small"
            active={viewMode === 'month'}
            onClick={() => onViewModeChange('dayGridMonth')}
            startIcon={<ViewModuleIcon />}
          >
            월
          </ViewButton>
          <ViewButton
            size="small"
            active={viewMode === 'week'}
            onClick={() => onViewModeChange('timeGridWeek')}
            startIcon={<ViewWeekIcon />}
          >
            주
          </ViewButton>
        </Box>

        {hasPermission('create') && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleNewReservation}
            sx={{
              fontSize: 14,
              minHeight: '36px',
              mt: { xs: 1, sm: 0 },
            }}
          >
            예약하기
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CalendarToolbar;
