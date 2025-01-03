package org.example.backend.news.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum NewsExceptionType implements BaseExceptionType {

    NOT_FOUND_NEWS(NOT_FOUND, "뉴스를 찾을 수 없습니다"),

    REQUIRED_Title(BAD_REQUEST, "제목은 필수 입력값입니다."),
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
