package org.example.backend.thesis.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;
import org.example.backend.thesis.exception.ThesisExceptionType;

@RequiredArgsConstructor
public class ThesisException extends BaseException {
    
    private final ThesisExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
