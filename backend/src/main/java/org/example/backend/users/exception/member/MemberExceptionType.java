package org.example.backend.users.exception.member;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum MemberExceptionType implements BaseExceptionType {
    DEPARTMENT_NOT_BIO(HttpStatus.BAD_REQUEST, "바이오융합공학과 소속이 아닙니다."),
    NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST, "사용자를 찾을 수 없습니다"),
    INVALID_ID_OR_PASSWORD(HttpStatus.UNAUTHORIZED, "유효하지 않는 아이디 또는 비밀번호입니다."),
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다.");

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
