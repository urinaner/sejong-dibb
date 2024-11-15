package org.example.backend.admin.exception;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
public enum AdminExceptionType implements BaseExceptionType {
    NOT_FOUND_ADMIN(NOT_FOUND, "계정을 찾을 수 없습니다"),
    ALREADY_EXIST_LOGIN_ID(NOT_FOUND, "이미 존재하는 로그인 ID입니다"),
    NOT_VALID_PASSWORD(NOT_FOUND, "비밀번호가 유효하지 않습니다"),
    INVALID_ACCESS_TOKEN(NOT_FOUND, "토큰이 유효하지 않습니다")
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
