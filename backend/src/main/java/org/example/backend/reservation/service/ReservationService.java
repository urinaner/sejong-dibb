package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.*;
import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.seminarRoom.exception.SeminarRoomException;
import org.example.backend.seminarRoom.repository.SeminarRoomRepository;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.ReservationStatus;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.repository.ReservationRepository;
import org.example.backend.timetable.domain.WeekDay;
import org.example.backend.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final SeminarRoomRepository seminarRoomRepository;
    private final TimetableRepository timetableRepository;


    @Transactional
    public ReservationResDto createReservation(ReservationReqDto reqDto) {
        SeminarRoom seminarRoom = seminarRoomRepository.findById(reqDto.getSeminarRoomId())
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));

        validateReservationTime(reqDto);
        validateTimeTableOverlap(reqDto, seminarRoom.getId());
        validateReservationOverlap(reqDto, seminarRoom.getId());

        Reservation reservation = Reservation.of(reqDto, seminarRoom);
        reservationRepository.save(reservation);

        return ReservationResDto.of(reservation);
    }

    public List<ReservationResDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }

    public ReservationResDto getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public ReservationResDto updateReservation(Long id, ReservationReqDto reqDto) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));

        SeminarRoom seminarRoom = seminarRoomRepository.findById(reqDto.getSeminarRoomId())
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));

        validateReservationTime(reqDto);
        validateReservationOverlap(reqDto, seminarRoom.getId());

        reservation.update(reqDto, seminarRoom);
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public ReservationResDto updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));

        reservation.updateStatus(status);
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
        reservationRepository.delete(reservation);
    }

    private void validateTimeTableOverlap(ReservationReqDto reqDto, Long seminarRoomId) {
        // DayOfWeek를 WeekDay로 변환
        WeekDay weekDay = WeekDay.from(reqDto.getStartTime().getDayOfWeek());

        boolean hasTimeTableConflict = timetableRepository.existsByTimeOverlap(
                seminarRoomId,
                reqDto.getStartTime().toLocalDate(),
                reqDto.getStartTime().toLocalTime(),
                reqDto.getEndTime().toLocalTime(),
                weekDay
        );

        if (hasTimeTableConflict) {
            throw new ReservationException(CONFLICT_TIMETABLE);
        }
    }

    private void validateReservationOverlap(ReservationReqDto reqDto, Long seminarRoomId) {
        boolean hasReservationConflict = reservationRepository.existsByTimePeriod(
                seminarRoomId,
                reqDto.getStartTime(),
                reqDto.getEndTime(),
                ReservationStatus.APPROVED
        );

        if (hasReservationConflict) {
            throw new ReservationException(EXIST_ALREADY_RESERVATION);
        }
    }

    private void validateReservationTime(ReservationReqDto reqDto) {
        LocalDateTime now = LocalDateTime.now();
//        if (reqDto.getStartTime().isBefore(now)) {
//            throw new ReservationException(PAST_TIME_RESERVATION);
//        }
        if (reqDto.getStartTime().isAfter(reqDto.getEndTime())) {
            throw new ReservationException(INVALID_TIME_ORDER);
        }

        // 예약 시간이 너무 긴 경우 체크 (예: 2시간 초과)
        long hours = ChronoUnit.HOURS.between(reqDto.getStartTime(), reqDto.getEndTime());
        if (hours > 2) {
            throw new ReservationException(EXCEEDS_MAX_DURATION);
        }
    }
}
