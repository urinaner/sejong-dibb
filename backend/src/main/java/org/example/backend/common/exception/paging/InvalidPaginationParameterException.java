package org.example.backend.common.exception.paging;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InvalidPaginationParameterException extends RuntimeException {
    private final InvalidPaginationParameterExceptionType exceptionType;
}