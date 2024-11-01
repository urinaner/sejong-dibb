package org.example.backend.seminar.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;

@RequiredArgsConstructor
public class SeminarException extends BaseException {

    private final SeminarExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
