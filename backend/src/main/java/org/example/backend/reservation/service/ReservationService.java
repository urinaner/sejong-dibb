package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.*;

import java.time.DayOfWeek;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {
    private final SlotRepository slotRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public ReservationResDto createReservation(Long roomId, ReservationReqDto reqDto, String loginId) {
        if (isWeekend(reqDto.getStartTime().toLocalDate()) || KoreanHoliday.isHoliday(reqDto.getStartTime().toLocalDate())) {
            throw new ReservationException(WEEKEND_OR_HOLIDAY);
        }

        List<Slot> slots = slotRepository.findSlotsForUpdate(
                roomId, reqDto.getStartTime(), reqDto.getEndTime());

        // 검증: 슬롯 개수가 부족하거나 하나라도 이미 예약된 경우
        int expectedSlotCount = (int) (Duration.between(reqDto.getStartTime(), reqDto.getEndTime()).toMinutes() / 30);
        if (slots.size() != expectedSlotCount || slots.stream().anyMatch(slot -> !slot.isAvailable())) {
            throw new ReservationException(EXIST_ALREADY_RESERVATION);
        }

        // 슬롯 예약 처리
        Reservation reservation = reservationRepository.save(Reservation.of(reqDto, loginId, slots));
        slots.forEach(slot -> slot.reserve(reservation));
        return ReservationResDto.of(reservation);

    }

    private boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
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

        // 슬롯 취소 처리
        reservation.getSlots().forEach(Slot::cancle);
        reservationRepository.delete(reservation);
    }
    private Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationException(NOT_FOUND_RESERVATION));
    }
}
