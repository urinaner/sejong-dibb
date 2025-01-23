package org.example.backend.jwt.exception;

import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum JwtExceptionType implements BaseExceptionType {
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Token expired. Please refresh."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token."),
    EMPTY_TOKEN(HttpStatus.UNAUTHORIZED, "Empty token.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    JwtExceptionType(HttpStatus httpStatus, String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }

    @Override
    public String errorMessage() {
        return errorMessage;
    }
}