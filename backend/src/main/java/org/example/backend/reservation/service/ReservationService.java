package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.EXIST_ALREADY_RESERVATION;
import static org.example.backend.reservation.exception.ReservationExceptionType.NOT_FOUND_RESERVATION;
import static org.example.backend.room.exception.RoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.dto.ReservationCreateDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.reservation.repository.ReservationRepository;
import org.example.backend.room.domain.Room;
import org.example.backend.room.exception.RoomException;
import org.example.backend.room.repository.RoomRepository;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.repository.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UsersRepository usersRepository;

    @Transactional
    public ReservationResDto createReservation(Long seminarRoomId, ReservationCreateDto reqDto, String loginId) {
        Room room = getSeminarRoomById(seminarRoomId);
        Users user = usersRepository.findByLoginId(loginId).get();

        validateReservationOverlap(reqDto, seminarRoomId);

        Reservation reservation = Reservation.of(reqDto, room, user);
        reservationRepository.save(reservation);
        return ReservationResDto.of(reservation);

    }

    @Transactional(readOnly = true)
    public List<ReservationResDto> getCurrentMonthReservations(Long roomId) {
        String currentYearMonth = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        return getMonthReservations(roomId, currentYearMonth);
    }

    @Transactional(readOnly = true)
    public List<ReservationResDto> getMonthReservations(Long roomId, String yearMonth) {
        return reservationRepository.findAllByRoomAndYearMonth(roomId, yearMonth).stream()
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

    private void validateReservationOverlap(ReservationCreateDto reqDto, Long seminarRoomId) {
        boolean hasReservationConflict = reservationRepository.existsByTimePeriod(
                seminarRoomId,
                reqDto.getStartTime(),
                reqDto.getEndTime()
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