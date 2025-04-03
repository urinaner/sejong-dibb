package org.example.backend.course.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public enum CourseExceptionType implements BaseExceptionType {

    NOT_FOUND_COURSE(NOT_FOUND, "해당 강의를 찾을 수 없습니다."),
    INVALID_COURSE_DTO_TYPE(BAD_REQUEST, "지원하지 않는 강의 DTO 타입입니다."),
    NOT_BS_COURSE_REQUEST_DTO(BAD_REQUEST, "학부과정 교과과목 데이터가 아닙니다."),
    NOT_MS_COURSE_REQUEST_DTO(BAD_REQUEST, "대학원 교과과목 데이터가 아닙니다."),
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