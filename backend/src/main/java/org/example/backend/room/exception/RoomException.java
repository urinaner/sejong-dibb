package org.example.backend.room.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;

@RequiredArgsConstructor
public class RoomException extends BaseException {
    private final RoomExceptionType exceptionType;
    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
