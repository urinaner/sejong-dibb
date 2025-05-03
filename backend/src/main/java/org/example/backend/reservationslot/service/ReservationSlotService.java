package org.example.backend.reservationslot.service;

import static org.example.backend.reservationslot.exception.ReservationExceptionType.*;
import static org.example.backend.room.exception.RoomExceptionType.*;
import static org.example.backend.users.exception.member.MemberExceptionType.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservationslot.domain.ReservationSlot;
import org.example.backend.reservationslot.domain.dto.ReservationCreateDto;
import org.example.backend.reservationslot.domain.dto.ReservationResDto;
import org.example.backend.reservationslot.exception.ReservationException;
import org.example.backend.reservationslot.repository.ReservationSlotRepository;
import org.example.backend.room.domain.Room;
import org.example.backend.room.exception.RoomException;
import org.example.backend.room.repository.RoomRepository;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.exception.member.MemberException;
import org.example.backend.users.repository.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationSlotService {
    private final ReservationSlotRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UsersRepository usersRepository;

    @Transactional
    public ReservationResDto createReservation(Long seminarRoomId, ReservationCreateDto reqDto, String loginId) {
        validateReservationRequest(reqDto);
        Room room = getSeminarRoomById(seminarRoomId);

        validateReservation(reqDto, seminarRoomId);

        ReservationSlot reservation = ReservationSlot.of(reqDto, room, loginId);
        reservationRepository.save(reservation);
        return ReservationResDto.of(reservation);

    }

    public List<ReservationResDto> getCurrentMonthReservations(Long roomId) {
        String currentYearMonth = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        return getMonthReservations(roomId, currentYearMonth);
    }

    public List<ReservationResDto> getMonthReservations(Long roomId, String yearMonth) {
        return reservationRepository.findAllByRoomAndYearMonth(roomId, yearMonth).stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }

    public List<ReservationResDto> getReservationsByRoomAndDate(Long seminarRoomId, String date) {
        getReservationById(seminarRoomId);
        return reservationRepository.findAllByDateAndStatus(seminarRoomId, date).stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteReservation(Long id, String loginId) {
        ReservationSlot reservation = getReservationById(id);

        if (!reservation.getLoginId().equals(loginId)) {
            throw new ReservationException(FORBIDDEN_OPERATION);
        }
        reservationRepository.delete(reservation);
    }
    private ReservationSlot getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
    }

    private Room getSeminarRoomById(Long seminarRoomId) {
        return roomRepository.findRoomForUpdate(seminarRoomId)
                .orElseThrow(() -> new RoomException(NOT_FOUND_SEMINAR_ROOM));
    }

    private Users getUserByLoginId(String loginId) {
        return usersRepository.findByLoginId(loginId).orElseThrow(() -> new MemberException(NOT_FOUND_MEMBER));
    }

    private void validateReservationRequest(ReservationCreateDto reqDto) {
        if (reqDto.getStartTime().isAfter(reqDto.getEndTime())) {
            throw new ReservationException(INVALID_TIME_ORDER);
        }

        if (reqDto.getStartTime().isBefore(LocalDateTime.now())) {
            throw new ReservationException(INVALID_TIME_ORDER);
        }
    }
    private void validateReservation(ReservationCreateDto reqDto, Long seminarRoomId) {
        boolean hasReservation = reservationRepository.existsByTimePeriod(
                seminarRoomId,
                reqDto.getStartTime(),
                reqDto.getEndTime()
        );

        if (hasReservation) {
            throw new ReservationException(EXIST_ALREADY_RESERVATION);
        }
    }
}