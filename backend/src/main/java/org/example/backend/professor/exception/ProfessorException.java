package org.example.backend.professor.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;
import org.example.backend.department.exception.DepartmentExceptionType;

@RequiredArgsConstructor
public class ProfessorException extends BaseException {

    private final ProfessorExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
