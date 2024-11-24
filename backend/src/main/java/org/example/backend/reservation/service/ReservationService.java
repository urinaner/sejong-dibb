package org.example.backend.reservation.service;

import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import org.example.backend.seminarRoom.domain.SeminarRoom;
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
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));

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
                .orElseThrow(() -> new IllegalArgumentException("예약이 존재하지 않습니다."));
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public ReservationResDto updateReservation(Long id, ReservationReqDto reqDto) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약이 존재하지 않습니다."));

        SeminarRoom seminarRoom = seminarRoomRepository.findById(reqDto.getSeminarRoomId())
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));

        validateReservationTime(reqDto);
        validateReservationOverlap(reqDto, seminarRoom.getId());

        reservation.update(reqDto, seminarRoom);
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public ReservationResDto updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약이 존재하지 않습니다."));

        reservation.updateStatus(status);
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약이 존재하지 않습니다."));
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
            throw new IllegalArgumentException(
                    String.format("해당 시간(%s %s)에 정기 수업이 있어 예약이 불가능합니다.",
                            weekDay.getKorName(),
                            reqDto.getStartTime().toLocalTime())
            );
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
            throw new IllegalArgumentException("해당 시간에 이미 승인된 예약이 존재합니다.");
        }
    }

    private void validateReservationTime(ReservationReqDto reqDto) {
        LocalDateTime now = LocalDateTime.now();
//        if (reqDto.getStartTime().isBefore(now)) {
//            throw new IllegalArgumentException("과거의 시간으로 예약할 수 없습니다.");
//        }
        if (reqDto.getStartTime().isAfter(reqDto.getEndTime())) {
            throw new IllegalArgumentException("시작 시간은 종료 시간보다 이후일 수 없습니다.");
        }

        // 예약 시간이 너무 긴 경우 체크 (예: 2시간 초과)
        long hours = ChronoUnit.HOURS.between(reqDto.getStartTime(), reqDto.getEndTime());
        if (hours > 2) {
            throw new IllegalArgumentException("예약은 최대 2시간까지만 가능합니다.");
        }
    }
}
