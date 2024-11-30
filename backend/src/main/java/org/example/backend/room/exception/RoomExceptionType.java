package org.example.backend.room.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum RoomExceptionType implements BaseExceptionType {
    NOT_FOUND_SEMINAR_ROOM(NOT_FOUND, "세미나룸를 찾을 수 없습니다"),
    INVALID_NAME_VALUE(BAD_REQUEST, "세미나실 이름은 필수입니다."),
    INVALID_CAPACITY(BAD_REQUEST, "수용 인원은 1명 이상이어야 합니다.");
    ;

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
