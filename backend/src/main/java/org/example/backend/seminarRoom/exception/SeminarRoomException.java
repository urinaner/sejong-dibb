package org.example.backend.seminarRoom.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;
import org.example.backend.seminar.exception.SeminarExceptionType;

@RequiredArgsConstructor
public class SeminarRoomException extends BaseException {
    private final SeminarRoomExceptionType exceptionType;
    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
