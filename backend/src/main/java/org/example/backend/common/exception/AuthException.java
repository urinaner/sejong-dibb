package org.example.backend.common.exception;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthException  extends BaseException{
    private final AuthExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
