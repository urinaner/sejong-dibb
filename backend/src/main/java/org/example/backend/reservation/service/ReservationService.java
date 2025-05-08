package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.*;
import static org.example.backend.room.exception.RoomExceptionType.*;
import static org.example.backend.users.exception.member.MemberExceptionType.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.Slot;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.reservation.repository.ReservationRepository;
import org.example.backend.reservation.repository.SlotRepository;
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
public class ReservationService {
    private final SlotRepository slotRepository;
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UsersRepository usersRepository;

    @Transactional
    public ReservationResDto createReservation(Long roomId, ReservationReqDto reqDto, String loginId) {
        List<Slot> slots = slotRepository.findSlotsForUpdate(
                roomId, reqDto.getStartTime(), reqDto.getEndTime());

        // 검증: 슬롯 개수가 부족하거나 하나라도 이미 예약된 경우
        int expectedSlotCount = (int) (Duration.between(reqDto.getStartTime(), reqDto.getEndTime()).toMinutes() / 30);
        if (slots.size() != expectedSlotCount || slots.stream().anyMatch(slot -> !slot.isAvailable())) {
            throw new ReservationException(EXIST_ALREADY_RESERVATION);
        }

        // 예약 처리
        Reservation reservation = reservationRepository.save(Reservation.of(reqDto, loginId, slots));
        slots.forEach(slot -> slot.reserve(reservation));
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
        Reservation reservation = getReservationById(id);

        if (!reservation.getLoginId().equals(loginId)) {
            throw new ReservationException(FORBIDDEN_OPERATION);
        }
        reservationSlotRepository.delete(reservation);
    }
    private Reservation getReservationById(Long id) {
        return reservationSlotRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
    }
}
