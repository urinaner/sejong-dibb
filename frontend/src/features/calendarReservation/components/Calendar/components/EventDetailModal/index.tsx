// src/features/calendarReservation/components/Calendar/components/EventDetailModal/index.tsx
import React from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import { Reservation } from '../../../../types/reservation.types';

// 스타일드 컴포넌트
const ColorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: color,
  marginRight: 12,
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const DetailIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface EventDetailModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
  onDelete: (id: number) => void;
  onEdit?: () => void;
  isAdmin: boolean;
  hasPermission: (action: 'create' | 'read' | 'update' | 'delete') => boolean;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  open,
  onClose,
  reservation,
  onDelete,
  onEdit,
  isAdmin,
  hasPermission,
}) => {
  const { useDeleteReservation } = useReservationQuery(reservation.roomId || 1);
  const deleteReservation = useDeleteReservation();

  const getPurposeTitle = (purpose: Reservation['purpose']) => {
    const titles = {
      SEMINAR: '세미나',
      CLASS: '수업',
      MEETING: '회의',
      OTHER: '기타',
    };
    return titles[purpose] || '기타';
  };

  const getPurposeColor = (purpose: Reservation['purpose']) => {
    const colors = {
      SEMINAR: '#1a73e8',
      CLASS: '#0b8043',
      MEETING: '#f6bf26',
      OTHER: '#616161',
    };
    return colors[purpose] || colors.OTHER;
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 예약을 삭제하시겠습니까?')) {
      try {
        await deleteReservation.mutateAsync(reservation.id);
        onDelete(reservation.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete reservation:', error);
        alert('예약 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 예약 상태에 따른 칩 색상 및 라벨
  const getStatusChip = (status: Reservation['status']) => {
    const statusConfig = {
      PENDING: { color: 'warning', label: '승인 대기' },
      CONFIRMED: { color: 'success', label: '승인됨' },
      CANCELLED: { color: 'error', label: '취소됨' },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <Chip
        size="small"
        color={config.color as 'warning' | 'success' | 'error'}
        label={config.label}
        sx={{ ml: 1 }}
      />
    );
  };

  // 현재 사용자가 이 예약의 소유자인지 확인
  const isOwner = () => {
    const userId = localStorage.getItem('userId');
    return userId && Number(userId) === reservation.userId;
  };

  // 수정 및 삭제 권한 확인
  const canEdit = hasPermission('update') && (isAdmin || isOwner());
  const canDelete = hasPermission('delete') && (isAdmin || isOwner());

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="event-detail-dialog-title"
    >
      <DialogTitle id="event-detail-dialog-title" sx={{ m: 0, p: 2 }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">예약 상세 정보</Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ColorBox color={getPurposeColor(reservation.purpose)} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
            {getPurposeTitle(reservation.purpose)}
          </Typography>
          {/*{getStatusChip(reservation.status)}*/}
        </Box>

        <DetailCard>
          <DetailItem>
            <DetailIcon>
              <AccessTimeIcon />
            </DetailIcon>
            <Box>
              <Typography variant="caption" color="textSecondary">
                일시
              </Typography>
              <Typography variant="body1">
                {format(
                  new Date(reservation.startTime),
                  'yyyy년 M월 d일 (EEE) HH:mm',
                )}{' '}
                -{format(new Date(reservation.endTime), 'HH:mm')}
              </Typography>
            </Box>
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <RoomIcon />
            </DetailIcon>
            <Box>
              <Typography variant="caption" color="textSecondary">
                장소
              </Typography>
              <Typography variant="body1">
                세미나실 {reservation.roomId || 1}
              </Typography>
            </Box>
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <PersonIcon />
            </DetailIcon>
            <Box>
              <Typography variant="caption" color="textSecondary">
                예약자
              </Typography>
              <Typography variant="body1">
                사용자 ID: {reservation.userId}
              </Typography>
            </Box>
          </DetailItem>

          {reservation.etc && (
            <>
              <Divider sx={{ my: 2 }} />
              <DetailItem>
                <DetailIcon>
                  <NotesIcon />
                </DetailIcon>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    비고
                  </Typography>
                  <Typography variant="body1">{reservation.etc}</Typography>
                </Box>
              </DetailItem>
            </>
          )}
        </DetailCard>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {/* 권한에 따른 버튼 표시 제어 */}
        {canDelete && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            삭제
          </Button>
        )}

        {canEdit && onEdit && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{ ml: 1 }}
          >
            수정
          </Button>
        )}

        <Button onClick={onClose} color="inherit" sx={{ ml: 1 }}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailModal;
