package org.example.backend.reservationslot.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;

@RequiredArgsConstructor
public class ReservationException extends BaseException {
    private final ReservationExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
