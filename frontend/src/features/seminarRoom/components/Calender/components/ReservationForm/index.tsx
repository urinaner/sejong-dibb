import React, { useState } from 'react';
import { format } from 'date-fns';
import {
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
  Button,
  CircularProgress,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Save as SaveIcon } from '@mui/icons-material';
import useAuth from '../../../../../../hooks/useAuth';
import { useReservationQuery } from '../../../../hooks/useReservationQuery';
import {
  Reservation,
  ReservationStatus,
  ReservationPurpose,
} from '../../../../types/reservation.types';
import useReservationStore from '../../../../store/reservationStore';

interface ReservationFormProps {
  roomId: number;
  startTime?: string;
  endTime?: string;
  reservation?: Reservation;
  preselectedDate: Date;
  onSave: (reservation: Reservation) => void;
  onClose: () => void;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) continue;
      options.push(
        `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`,
      );
    }
  }
  return options;
};

const ReservationForm: React.FC<ReservationFormProps> = ({
  roomId,
  startTime,
  endTime,
  reservation,
  preselectedDate,
  onSave,
  onClose,
}) => {
  const { user } = useAuth();
  const { useCreateReservation, useUpdateReservation } =
    useReservationQuery(roomId);
  const createReservation = useCreateReservation();
  const updateReservation = useUpdateReservation();
  const { setError: setStoreError } = useReservationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeOptions = generateTimeOptions();

  const getDefaultTime = (raw?: string, fallback?: string) => {
    if (!raw) return fallback || '09:00';
    const date = new Date(raw);
    const hours = date.getHours();
    const minutes = Math.round(date.getMinutes() / 30) * 30;
    return `${hours.toString().padStart(2, '0')}:${minutes === 0 ? '00' : '30'}`;
  };

  const [formData, setFormData] = useState({
    date: format(preselectedDate, 'yyyy-MM-dd'),
    startTime: getDefaultTime(startTime, '09:00'),
    endTime: getDefaultTime(endTime, '10:00'),
    purpose: reservation?.purpose || 'MEETING',
    etc: reservation?.etc || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(`${formData.date}T${formData.endTime}`);
    if (!formData.date || !formData.startTime || !formData.endTime) {
      return '날짜와 시간을 모두 입력해주세요.';
    }
    if (start >= end) return '종료 시간은 시작 시간보다 늦어야 합니다.';
    if (start < new Date()) return '과거 시간에는 예약할 수 없습니다.';
    if (start.getHours() < 9) return '예약은 오전 9시부터 가능합니다.';
    if (
      end.getHours() > 18 ||
      (end.getHours() === 18 && end.getMinutes() > 0)
    ) {
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
      const data: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'> = {
        startTime: `${formData.date}T${formData.startTime}:00`,
        endTime: `${formData.date}T${formData.endTime}:00`,
        purpose: formData.purpose as ReservationPurpose,
        etc: formData.etc,
        status: 'PENDING',
        userId: Number(user) || 0,
      };

      let result: Reservation;

      if (reservation) {
        await updateReservation.mutateAsync({
          reservationId: reservation.id,
          data,
        });
        result = { ...reservation, ...data };
      } else {
        result = await createReservation.mutateAsync(data);
      }

      onSave(result);
      onClose();
    } catch (err: any) {
      setError('예약 저장 중 오류가 발생했습니다.');
      setStoreError(err?.message || '예약 저장 중 오류');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {reservation ? '예약 수정' : '새 예약 만들기'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="날짜"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="startTime-label">시작 시간</InputLabel>
            <Select
              labelId="startTime-label"
              name="startTime"
              value={formData.startTime}
              onChange={handleSelectChange}
              label="시작 시간"
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="endTime-label">종료 시간</InputLabel>
            <Select
              labelId="endTime-label"
              name="endTime"
              value={formData.endTime}
              onChange={handleSelectChange}
              label="종료 시간"
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
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
          <FormControl fullWidth>
            <InputLabel id="purpose-label">예약 목적</InputLabel>
            <Select
              labelId="purpose-label"
              name="purpose"
              value={formData.purpose}
              onChange={handleSelectChange}
              label="예약 목적"
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
            fullWidth
            label="비고 (선택사항)"
            name="etc"
            value={formData.etc}
            onChange={handleInputChange}
            multiline
            rows={3}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={
              isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />
            }
            disabled={isSubmitting}
          >
            {reservation ? '수정하기' : '예약하기'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationForm;
