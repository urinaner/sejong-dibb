package org.example.backend.board.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum BoardExceptionType implements BaseExceptionType {
    NOT_FOUND_BOARD(NOT_FOUND, "게시글을 찾을 수 없습니다"),
    REQUIRED_TITLE(BAD_REQUEST, "제목은 필수 입력값입니다."),
    REQUIRED_CONTENT(BAD_REQUEST, "내용은 필수 입력값입니다."),
    REQUIRED_DEPARTMENT_ID(BAD_REQUEST, "부서 ID는 필수 입력값입니다."),
    REQUIRED_FILE(BAD_REQUEST, "파일이 비어 있습니다.")
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
