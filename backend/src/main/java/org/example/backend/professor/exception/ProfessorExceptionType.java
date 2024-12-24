package org.example.backend.professor.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
public enum ProfessorExceptionType implements BaseExceptionType {

    NOT_FOUND_PROFESSOR(NOT_FOUND, "교수를 찾을 수 없습니다"),
    NOT_FOUND_FILE(NOT_FOUND, "파일을 찾을 수 없습니다"),
    DUPLICATE_PHONE(BAD_REQUEST, "전화번호가 이미 존재합니다."),
    DUPLICATE_EMAIL(BAD_REQUEST, "이메일이 이미 존재합니다.")
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
