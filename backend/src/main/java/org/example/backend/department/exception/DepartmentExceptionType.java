package org.example.backend.department.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
public enum DepartmentExceptionType implements BaseExceptionType {
    NOT_FOUND_DEPARTMENT(NOT_FOUND, "부서을 찾을 수 없습니다"),
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
