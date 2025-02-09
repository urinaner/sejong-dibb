package org.example.backend.users.exception.member;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;
import org.example.backend.common.exception.BaseExceptionType;

@RequiredArgsConstructor
public class MemberException extends BaseException {
    private final MemberExceptionType exceptionType;

    @Override
    public BaseExceptionType exceptionType() {
        return exceptionType;
    }
}
