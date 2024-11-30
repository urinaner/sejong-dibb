package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.*;
import static org.example.backend.room.exception.RoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.utils.TimeParsingUtils;
import org.example.backend.reservation.domain.RepetitionType;
import org.example.backend.reservation.domain.ReservationPurpose;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.room.domain.Room;
import org.example.backend.room.exception.RoomException;
import org.example.backend.room.repository.RoomRepository;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.repository.ReservationRepository;
import org.example.backend.user.domain.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public List<ReservationResDto> createReservation(Long seminarRoomId, ReservationReqDto reqDto, User user) {
        Room room = getSeminarRoomById(seminarRoomId);

        validateReservationOverlap(reqDto, seminarRoomId);

        if (reqDto.isWeeklyReservation()) {
            List<Reservation> weeklyReservations = createWeeklyReservations(reqDto, room, user);
            reservationRepository.saveAll(weeklyReservations);
            return weeklyReservations.stream()
                    .map(ReservationResDto::of)
                    .collect(Collectors.toList());
        } else {
            Reservation reservation = Reservation.of(reqDto, room, user);
            reservationRepository.save(reservation);
            return List.of(ReservationResDto.of(reservation));
        }
    }

    private List<Reservation> createWeeklyReservations(ReservationReqDto reqDto, Room room, User user) {
        List<Reservation> reservations = new ArrayList<>();
        LocalDateTime startDateTime = TimeParsingUtils.formatterLocalDateTime(reqDto.getStartTime());
        LocalDateTime endDateTime = TimeParsingUtils.formatterLocalDateTime(reqDto.getEndTime());

        LocalDate startDate = startDateTime.toLocalDate();
        LocalDate endDate = endDateTime.toLocalDate();

        while (!startDate.isAfter(endDate)) {
            LocalDateTime weeklyStart = LocalDateTime.of(startDate, startDateTime.toLocalTime());
            LocalDateTime weeklyEnd = LocalDateTime.of(startDate, endDateTime.toLocalTime());
            reservations.add(Reservation.builder()
                    .startTime(weeklyStart)
                    .endTime(weeklyEnd)
                    .purpose(ReservationPurpose.valueOf(reqDto.getDefaultPurpose()))
                    .etc(reqDto.getEtc())
                    .repetitionType(RepetitionType.WEEKLY)
                    .room(room)
                    .user(user)
                    .build());
            startDate = startDate.plusWeeks(1);
        }
        return reservations;
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

    public List<ReservationResDto> getReservationsByRoomAndDate(Long seminarRoomId, String date) {
        getReservationById(seminarRoomId);
        return reservationRepository.findAllByDateAndStatus(seminarRoomId, date).stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }


    @Transactional
    public void deleteReservation(Long id) {
        Reservation reservation = getReservationById(id);
        reservationRepository.delete(reservation);
    }

    private void validateReservationOverlap(ReservationReqDto reqDto, Long seminarRoomId) {
        boolean hasReservationConflict = reservationRepository.existsByTimePeriod(
                seminarRoomId,
                TimeParsingUtils.formatterLocalDateTime(reqDto.getStartTime()),
                TimeParsingUtils.formatterLocalDateTime(reqDto.getEndTime())
        );

        if (hasReservationConflict) {
            throw new ReservationException(EXIST_ALREADY_RESERVATION);
        }
    }

    private Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
    }

    private Room getSeminarRoomById(Long seminarRoomId) {
        return roomRepository.findById(seminarRoomId)
                .orElseThrow(() -> new RoomException(NOT_FOUND_SEMINAR_ROOM));
    }

}
