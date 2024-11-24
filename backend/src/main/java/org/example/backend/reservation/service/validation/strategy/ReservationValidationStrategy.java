package org.example.backend.reservation.service.validation.strategy;

import org.example.backend.reservation.domain.dto.ReservationReqDto;

public interface ReservationValidationStrategy {
    void validate(ReservationReqDto request);
}