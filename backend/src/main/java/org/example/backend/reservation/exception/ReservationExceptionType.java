package org.example.backend.reservation.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
public enum ReservationExceptionType implements BaseExceptionType {

    NOT_FOUND_RESERVATION(NOT_FOUND, "예약을 찾을 수 없습니다"),
    EXIST_ALREADY_RESERVATION(BAD_REQUEST, "해당 시간에 이미 승인된 예약이 존재합니다."),
    CONFLICT_TIMETABLE(BAD_REQUEST, "해당 시간에 정기 수업이 있어 예약이 불가능합니다."),
    INVALID_TIME_ORDER(BAD_REQUEST, "시작시간과 종료시간이 유효하지 않습니다."),
    EXCEEDS_MAX_DURATION(BAD_REQUEST, "예약은 최대 2시간까지만 가능합니다."),
    PAST_TIME_RESERVATION(BAD_REQUEST, "과거의 시간으로 예약할 수 없습니다."),
    FORBIDDEN_OPERATION(BAD_REQUEST, "다른 사용자의 예약입니다."),
    WEEKEND_OR_HOLIDAY(BAD_REQUEST, "주말이나 공휴일은 예약할 수 없습니다."),
    OUT_OF_OPERATING_HOURS(BAD_REQUEST, "운영시간이 아닙니다."),
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