package org.example.backend.users.exception.admin;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;

@RequiredArgsConstructor
public class AdminException extends BaseException {
    private final AdminExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
