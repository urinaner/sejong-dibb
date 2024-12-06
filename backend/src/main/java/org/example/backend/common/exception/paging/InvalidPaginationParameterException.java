package org.example.backend.common.exception.paging;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseException;

@Getter
@RequiredArgsConstructor
public class InvalidPaginationParameterException extends BaseException {
    private final InvalidPaginationParameterExceptionType exceptionType;

    @Override
    public InvalidPaginationParameterExceptionType exceptionType(){
        return exceptionType;
    }
}
