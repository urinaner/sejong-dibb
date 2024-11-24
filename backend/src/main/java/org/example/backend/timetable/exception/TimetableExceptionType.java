package org.example.backend.timetable.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum TimetableExceptionType implements BaseExceptionType {
    NOT_FOUND_TIMETABLE(NOT_FOUND, "시간표를 찾을 수 없습니다"),
    INVALID_INPUT_TIME(BAD_REQUEST, "시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
    private final HttpStatus httpStatus;
    private final String errorMessage;
    @Override
    public HttpStatus httpStatus() {
        return null;
    }

    @Override
    public String errorMessage() {
        return null;
    }
}
