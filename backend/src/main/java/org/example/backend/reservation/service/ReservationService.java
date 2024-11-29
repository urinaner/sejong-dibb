package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.*;
import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.RepetitionType;
import org.example.backend.reservation.domain.ReservationPurpose;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.reservation.service.validation.ReservationValidator;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.seminarRoom.exception.SeminarRoomException;
import org.example.backend.seminarRoom.repository.SeminarRoomRepository;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.ReservationStatus;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final SeminarRoomRepository seminarRoomRepository;
    private final ReservationValidator validator;

    @Transactional
    public List<ReservationResDto> createReservation(Long seminarRoomId, ReservationReqDto reqDto) {
        SeminarRoom seminarRoom = getSeminarRoomById(seminarRoomId);

        validator.validate(reqDto, seminarRoomId);

        if (reqDto.isWeeklyReservation()) {
            List<Reservation> weeklyReservations = createWeeklyReservations(reqDto, seminarRoom);
            reservationRepository.saveAll(weeklyReservations);
            return weeklyReservations.stream()
                    .map(ReservationResDto::of)
                    .collect(Collectors.toList());
        } else {
            Reservation reservation = Reservation.of(reqDto, seminarRoom);
            reservationRepository.save(reservation);
            return List.of(ReservationResDto.of(reservation));
        }
    }

    private List<Reservation> createWeeklyReservations(ReservationReqDto reqDto, SeminarRoom seminarRoom) {
        List<Reservation> reservations = new ArrayList<>();
        LocalDate startDate = reqDto.getStartTime().toLocalDate();
        LocalDate endDate = reqDto.getEndTime().toLocalDate();

        while (!startDate.isAfter(endDate)) {
            LocalDateTime weeklyStart = LocalDateTime.of(startDate, reqDto.getStartTime().toLocalTime());
            LocalDateTime weeklyEnd = LocalDateTime.of(startDate, reqDto.getEndTime().toLocalTime());
            reservations.add(Reservation.builder()
                    .startTime(weeklyStart)
                    .endTime(weeklyEnd)
                    .purpose(ReservationPurpose.valueOf(reqDto.getDefaultPurpose()))
                    .etc(reqDto.getEtc())
                    .repetitionType(RepetitionType.WEEKLY)
                    .status(ReservationStatus.APPROVED)
                    .seminarRoom(seminarRoom)
                    .userId(reqDto.getUserId())
                    .build());
            startDate = startDate.plusWeeks(1);
        }
        return reservations;
    }

    public List<ReservationResDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }

    public List<ReservationResDto> getReservationsByRoom(Long seminarRoomId) {
        getSeminarRoomById(seminarRoomId);
        return reservationRepository.finaReservationsBySeminarRoom(seminarRoomId).stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }

    public ReservationResDto getReservation(Long id) {
        Reservation reservation = getReservationById(id);
        return ReservationResDto.of(reservation);
    }

    public List<ReservationResDto> getReservationsByRoomAndDate(Long seminarRoomId, LocalDate date, ReservationStatus status) {
        getReservationById(seminarRoomId);
        return reservationRepository.findAllByDateAndStatus(seminarRoomId, date, status).stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }


    @Transactional
    public ReservationResDto updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = getReservationById(id);

        reservation.updateStatus(status);
        return ReservationResDto.of(reservation);
    }

    @Transactional
    public void deleteReservation(Long id) {
        Reservation reservation = getReservationById(id);
        reservationRepository.delete(reservation);
    }

    private Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
    }

    private SeminarRoom getSeminarRoomById(Long seminarRoomId) {
        return seminarRoomRepository.findById(seminarRoomId)
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));
    }


}
