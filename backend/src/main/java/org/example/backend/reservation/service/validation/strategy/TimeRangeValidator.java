package org.example.backend.reservation.service.validation.strategy;

import static org.example.backend.reservation.exception.ReservationExceptionType.EXCEEDS_MAX_DURATION;
import static org.example.backend.reservation.exception.ReservationExceptionType.INVALID_TIME_ORDER;

import java.time.temporal.ChronoUnit;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.exception.ReservationException;
import org.springframework.stereotype.Component;

@Component
public class TimeRangeValidator implements ReservationValidationStrategy {
    @Override
    public void validate(ReservationReqDto reqDto, Long seminarRoomId) {
        if (reqDto.getStartTime().isAfter(reqDto.getEndTime())) {
            throw new ReservationException(INVALID_TIME_ORDER);
        }

        long hours = ChronoUnit.HOURS.between(reqDto.getStartTime(), reqDto.getEndTime());
        if (hours > 2) {
            throw new ReservationException(EXCEEDS_MAX_DURATION);
        }
    }
}