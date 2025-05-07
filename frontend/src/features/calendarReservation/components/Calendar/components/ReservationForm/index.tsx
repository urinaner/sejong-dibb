// src/features/calendarReservation/components/Calendar/components/ReservationForm/index.tsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  Box,
  FormHelperText,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EventIcon from '@mui/icons-material/Event';
import useAuth from '../../../../../../hooks/useAuth';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import {
  Reservation,
  ReservationStatus,
  ReservationPurpose,
  ReservationCreateDto,
} from '../../../../types/reservation.types';
import useReservationStore from '../../../../store/reservationStore';

// 시간 옵션 생성 함수 (30분 간격)
const generateTimeOptions = () => {
  const options = [];
  const startHour = 9;
  const endHour = 18;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of [0, 30]) {
      // 18:30은 포함하지 않음
      if (hour === endHour && minute === 30) continue;

      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const timeString = `${formattedHour}:${formattedMinute}`;

      options.push(timeString);
    }
  }

  return options;
};

interface ReservationFormProps {
  roomId: number;
  startTime?: string;
  endTime?: string;
  reservation?: Reservation;
  onSave: (reservation: Reservation) => void;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  roomId,
  startTime,
  endTime,
  reservation,
  onSave,
  onClose,
}) => {
  const { user, isAdmin } = useAuth();
  const { useCreateReservation, useUpdateReservation } =
    useReservationQuery(roomId);
  const createReservation = useCreateReservation();
  const updateReservation = useUpdateReservation();
  const { selectedDate, setError: setStoreError } = useReservationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeOptions = generateTimeOptions();

  // 기본값 설정 로직
  const getDefaultStartTime = () => {
    if (startTime) {
      const date = new Date(startTime);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // 시간이 허용 범위 내인지 확인
      if (hours >= 9 && hours < 18) {
        // 30분 간격으로 반올림
        const roundedMinutes = Math.round(minutes / 30) * 30;
        return `${hours.toString().padStart(2, '0')}:${roundedMinutes === 0 ? '00' : '30'}`;
      }
    }

    // 기본값: 9:00
    return '09:00';
  };

  const getDefaultEndTime = () => {
    if (endTime) {
      const date = new Date(endTime);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // 시간이 허용 범위 내인지 확인
      if (hours >= 9 && hours <= 18) {
        // 30분 간격으로 반올림
        const roundedMinutes = Math.round(minutes / 30) * 30;
        return `${hours.toString().padStart(2, '0')}:${roundedMinutes === 0 ? '00' : '30'}`;
      }
    }

    // 기본값: 시작 시간 + 1시간 (또는 18:00이 초과될 경우)
    const startTimeValue = getDefaultStartTime();
    const [startHour, startMinute] = startTimeValue.split(':').map(Number);
    let endHour = startHour + 1;
    let endMinute = startMinute;

    if (endHour > 18) {
      endHour = 18;
      endMinute = 0;
    }

    return `${endHour.toString().padStart(2, '0')}:${endMinute === 0 ? '00' : '30'}`;
  };

  // 기본값 설정
  const initialDate = startTime
    ? format(new Date(startTime), 'yyyy-MM-dd')
    : format(selectedDate, 'yyyy-MM-dd');

  const initialStartTime = getDefaultStartTime();
  const initialEndTime = getDefaultEndTime();

  const [formData, setFormData] = useState({
    date: initialDate,
    startTime: initialStartTime,
    endTime: initialEndTime,
    purpose: reservation?.purpose || 'MEETING',
    etc: reservation?.etc || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 시작 시간이 변경된 경우, 끝 시간 조정
    if (name === 'startTime') {
      const [startHour, startMinute] = value.split(':').map(Number);
      const [currentEndHour, currentEndMinute] = formData.endTime
        .split(':')
        .map(Number);

      // 종료 시간이 시작 시간보다 이전이거나 같은 경우 조정
      const startTimeTotal = startHour * 60 + startMinute;
      const endTimeTotal = currentEndHour * 60 + currentEndMinute;

      if (endTimeTotal <= startTimeTotal) {
        // 시작 시간 + 30분, 최대 18:00
        let newEndHour = startHour;
        let newEndMinute = startMinute + 30;

        if (newEndMinute >= 60) {
          newEndHour += 1;
          newEndMinute = 0;
        }

        if (newEndHour > 18 || (newEndHour === 18 && newEndMinute > 0)) {
          newEndHour = 18;
          newEndMinute = 0;
        }

        setFormData((prev) => ({
          ...prev,
          endTime: `${newEndHour.toString().padStart(2, '0')}:${newEndMinute === 0 ? '00' : '30'}`,
        }));
      }
    }
  };

  const validateForm = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) {
      return '날짜와 시간을 모두 입력해주세요.';
    }

    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(`${formData.date}T${formData.endTime}`);

    if (start >= end) {
      return '종료 시간은 시작 시간보다 늦어야 합니다.';
    }

    if (start < new Date()) {
      return '과거 시간에는 예약할 수 없습니다.';
    }

    // 허용 시간 범위(9:00-18:00) 확인
    const startHour = start.getHours();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();

    if (startHour < 9) {
      return '예약은 오전 9시부터 가능합니다.';
    }

    if (endHour > 18 || (endHour === 18 && endMinutes > 0)) {
      return '예약은 오후 6시까지만 가능합니다.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const reservationStatus: ReservationStatus = 'PENDING';

      const data = {
        startTime: `${formData.date}T${formData.startTime}:00`,
        endTime: `${formData.date}T${formData.endTime}:00`,
        purpose: formData.purpose as ReservationPurpose,
        etc: formData.etc,
        status: reservationStatus,
        userId: user || 0, // 현재 로그인한 사용자 ID
      };

      let result;

      if (reservation) {
        // 예약 수정
        const updateData: Partial<Reservation> = {
          startTime: data.startTime,
          endTime: data.endTime,
          purpose: data.purpose,
          etc: data.etc,
          status: data.status,
        };

        await updateReservation.mutateAsync({
          reservationId: reservation.id,
          data: updateData,
        });

        // 전체 객체 구성
        result = {
          ...reservation,
          ...updateData,
        };
      } else {
        // 새 예약 생성
        result = await createReservation.mutateAsync(
          data as ReservationCreateDto,
        );
      }

      onSave(result as Reservation);
      onClose();
    } catch (error: any) {
      console.error('Failed to save reservation:', error);
      setError('예약 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      setStoreError(error?.message || '예약 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={!isSubmitting ? onClose : undefined}
      fullWidth
      maxWidth="sm"
      aria-labelledby="reservation-dialog-title"
    >
      <DialogTitle id="reservation-dialog-title" sx={{ m: 0, p: 2 }}>
        <Box display="flex" alignItems="center">
          <EventIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">
            {reservation ? '예약 수정' : '세미나실 예약 '}
          </Typography>
        </Box>
        {!isSubmitting && (
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
        )}
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="날짜"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="startTime-label">시작 시간</InputLabel>
                <Select
                  labelId="startTime-label"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleSelectChange}
                  label="시작 시간"
                  disabled={isSubmitting}
                >
                  {timeOptions.map((time) => (
                    <MenuItem key={`start-${time}`} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="endTime-label">종료 시간</InputLabel>
                <Select
                  labelId="endTime-label"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleSelectChange}
                  label="종료 시간"
                  disabled={isSubmitting}
                >
                  {timeOptions.map((time) => (
                    <MenuItem key={`end-${time}`} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormHelperText>
                예약 가능 시간: 09:00 - 18:00 (30분 단위)
              </FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="purpose-label">예약 목적</InputLabel>
                <Select
                  labelId="purpose-label"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleSelectChange}
                  label="예약 목적"
                  disabled={isSubmitting}
                >
                  <MenuItem value="SEMINAR">세미나</MenuItem>
                  <MenuItem value="CLASS">수업</MenuItem>
                  <MenuItem value="MEETING">회의</MenuItem>
                  <MenuItem value="OTHER">기타</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="etc"
                label="비고 (선택사항)"
                name="etc"
                value={formData.etc}
                onChange={handleInputChange}
                placeholder="추가 설명이나 참석자 정보 등을 입력하세요"
                multiline
                rows={3}
                disabled={isSubmitting}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          startIcon={
            isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : reservation ? '수정하기' : '예약하기'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationForm;
