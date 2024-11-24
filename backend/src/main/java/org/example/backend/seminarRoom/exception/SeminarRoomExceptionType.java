package org.example.backend.seminarRoom.exception;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum SeminarRoomExceptionType implements BaseExceptionType {
    NOT_FOUND_SEMINAR_ROOM(NOT_FOUND, "세미나룸를 찾을 수 없습니다")
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
