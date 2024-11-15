package org.example.backend.common.exception.paging;

import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum InvalidPaginationParameterExceptionType implements BaseExceptionType {
    INVALID_PAGE("페이지 번호는 0 이상이어야 합니다.", HttpStatus.BAD_REQUEST),
    INVALID_SIZE("페이지 크기는 양의 정수여야 합니다.", HttpStatus.BAD_REQUEST),
    UNKNOWN_PARAMETER("잘못된 paging 파라미터입니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;

    InvalidPaginationParameterExceptionType(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    @Override
    public String errorMessage() {
        return message;
    }

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }
}