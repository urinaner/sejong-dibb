package org.example.backend.timetable.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;
import org.example.backend.seminar.exception.SeminarExceptionType;

@RequiredArgsConstructor
public class TimetableException extends BaseException {
    private final TimetableExceptionType exceptionType;
    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
