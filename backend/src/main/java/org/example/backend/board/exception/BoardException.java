package org.example.backend.board.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;
import org.example.backend.board.exception.BoardExceptionType;

@RequiredArgsConstructor
public class BoardException extends BaseException {
    private final BoardExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
