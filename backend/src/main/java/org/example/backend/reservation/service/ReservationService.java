package org.example.backend.reservation.service;

import static org.example.backend.reservation.exception.ReservationExceptionType.*;
import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import lombok.RequiredArgsConstructor;
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
    public ReservationResDto createReservation(Long seminarRoomId, ReservationReqDto reqDto) {
        SeminarRoom seminarRoom = getSeminarRoomById(seminarRoomId);

        validator.validate(reqDto, seminarRoomId);

        Reservation reservation = Reservation.of(reqDto, seminarRoom);
        reservationRepository.save(reservation);

        return ReservationResDto.of(reservation);
    }

    private SeminarRoom getSeminarRoomById(Long seminarRoomId) {
        return seminarRoomRepository.findById(seminarRoomId)
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));
    }

    public List<ReservationResDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationResDto::of)
                .collect(Collectors.toList());
    }

    public ReservationResDto getReservation(Long id) {
        Reservation reservation = getReservationById(id);
        return ReservationResDto.of(reservation);
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
}
