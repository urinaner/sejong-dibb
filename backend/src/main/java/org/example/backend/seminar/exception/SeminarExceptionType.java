package org.example.backend.seminar.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum SeminarExceptionType implements BaseExceptionType {

        NOT_FOUND_SEMINAR(NOT_FOUND, "세미나를 찾을 수 없습니다"),
        ;

        private final HttpStatus httpStatus;
        private final String errorMessage;

        @Override
        public HttpStatus httpStatus() {
            return httpStatus;
        }

        @Override
        public String errorMessage() {
            return errorMessage;
        }
}
