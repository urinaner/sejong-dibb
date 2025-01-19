package org.example.backend.reservation.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum ReservationExceptionType implements BaseExceptionType {

    NOT_FOUND_RESERVATION(NOT_FOUND, "예약을 찾을 수 없습니다"),
    NOT_VALID_RESERVATION_PASSWORD(BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    EXIST_ALREADY_RESERVATION(BAD_REQUEST, "해당 시간에 이미 승인된 예약이 존재합니다."),
    CONFLICT_TIMETABLE(BAD_REQUEST, "해당 시간에 정기 수업이 있어 예약이 불가능합니다."),
    INVALID_TIME_ORDER(BAD_REQUEST, "시작 시간은 종료 시간보다 이후일 수 없습니다."),
    EXCEEDS_MAX_DURATION(BAD_REQUEST, "예약은 최대 2시간까지만 가능합니다."),
    PAST_TIME_RESERVATION(BAD_REQUEST, "과거의 시간으로 예약할 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String errorMessage;

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }

    @Override
    public String errorMessage() {
        return errorMessage;
    }
}