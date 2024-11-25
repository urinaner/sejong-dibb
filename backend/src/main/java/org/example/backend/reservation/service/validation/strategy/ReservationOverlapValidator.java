package org.example.backend.reservation.service.validation.strategy;

import static org.example.backend.reservation.exception.ReservationExceptionType.EXIST_ALREADY_RESERVATION;

import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.ReservationStatus;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservationOverlapValidator implements ReservationValidationStrategy {
    private final ReservationRepository reservationRepository;

    @Override
    public void validate(ReservationReqDto reqDto) {
        boolean hasReservationConflict = reservationRepository.existsByTimePeriod(
                reqDto.getSeminarRoomId(),
                reqDto.getStartTime(),
                reqDto.getEndTime(),
                ReservationStatus.APPROVED
        );

        if (hasReservationConflict) {
            throw new ReservationException(EXIST_ALREADY_RESERVATION);
        }
    }
}