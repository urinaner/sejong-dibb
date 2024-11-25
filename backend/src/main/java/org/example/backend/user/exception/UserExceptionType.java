package org.example.backend.user.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum UserExceptionType implements BaseExceptionType {

    NOT_FOUND_USER(NOT_FOUND, "사용자를 찾을 수 없습니다"),
    DUPLICATE_PHONE(BAD_REQUEST, "전화번호가 이미 존재합니다."),
    REQUIRED_NAME(BAD_REQUEST, "이름은 필수 입력값입니다."),
    REQUIRED_STUDENT_ID(BAD_REQUEST, "학번은 필수 입력값입니다.")
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
