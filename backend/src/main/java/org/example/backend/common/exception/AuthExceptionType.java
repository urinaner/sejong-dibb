package org.example.backend.common.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum AuthExceptionType implements BaseExceptionType {
    PLEASE_LOGIN(BAD_REQUEST ,"로그인 해주세요");
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
