package org.example.backend.reservation.service.validation;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.service.validation.strategy.ReservationValidationStrategy;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservationValidator {
    private final List<ReservationValidationStrategy> validators;

    public void validate(ReservationReqDto reqDto) {
        validators.forEach(validator -> validator.validate(reqDto));
    }
}