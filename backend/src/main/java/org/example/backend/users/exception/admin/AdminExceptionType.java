package org.example.backend.users.exception.admin;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
public enum AdminExceptionType implements BaseExceptionType {
    NOT_FOUND_ADMIN(NOT_FOUND, "계정을 찾을 수 없습니다"),
    ALREADY_EXIST_LOGIN_ID(NOT_FOUND, "이미 존재하는 로그인 ID입니다"),
    NOT_VALID_PASSWORD(NOT_FOUND, "비밀번호가 유효하지 않습니다"),
    INVALID_ACCESS_TOKEN(NOT_FOUND, "토큰이 유효하지 않습니다"),
    NOT_FOUND_MAIL(NOT_FOUND, "메일을 찾을 수 없습니다"),
    NOT_MATCH_EMAIL(NOT_FOUND, "이메일이 관리자 정보와 일치하지 않습니다"),
    NOT_FOUND_MAIL_RECEIVER(NOT_FOUND, "메일 수신자가 설정되지 않았습니다"),
    INVALID_PASSWORD_PATTERN(NOT_FOUND, "비밀번호는 8자 이상, 대문자 1개 이상, 소문자 1개 이상, 숫자 1개 이상, 특수문자 1개 이상 포함해야 합니다.")
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
