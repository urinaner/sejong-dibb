package org.example.backend.department.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;

@RequiredArgsConstructor
public class DepartmentException extends BaseException {

    private final DepartmentExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}