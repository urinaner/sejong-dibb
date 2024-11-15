package org.example.backend.common.exception;

import static java.util.stream.Collectors.joining;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.common.exception.paging.InvalidPaginationParameterException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionControllerAdvice {

    @ExceptionHandler(BaseException.class)
    ResponseEntity<ExceptionResponse> handleException(HttpServletRequest request, BaseException e) {
        BaseExceptionType type = e.exceptionType();
        log.info("잘못된 요청이 들어왔습니다. URI: {},  내용:  {}", request.getRequestURI(), type.errorMessage());
        return ResponseEntity.status(type.httpStatus())
                .body(new ExceptionResponse(type.errorMessage()));
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    ResponseEntity<ExceptionResponse> handleMissingParams(MissingServletRequestParameterException e) {
        String errorMessage = e.getParameterName() + " 값이 누락 되었습니다.";
        log.info("잘못된 요청이 들어왔습니다. 내용:  {}", errorMessage);
        return ResponseEntity.status(BAD_REQUEST)
                .body(new ExceptionResponse(errorMessage));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ExceptionResponse> handleException(HttpServletRequest request, Exception e) {
        log.error("예상하지 못한 예외가 발생했습니다. URI: {}, ", request.getRequestURI(), e);
        return ResponseEntity.internalServerError()
                .body(new ExceptionResponse("알 수 없는 오류가 발생했습니다."));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    ResponseEntity<ExceptionResponse> handleHttpMessageNotReadableException(HttpServletRequest request, HttpMessageNotReadableException e) {
        log.info("요청 본문이 비어 있습니다. URI: {}", request.getRequestURI());
        return ResponseEntity.status(BAD_REQUEST)
                .body(new ExceptionResponse("요청 본문이 비어 있습니다."));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        log.error("DataIntegrityViolationException occurred: ", e);

        //참조 제약 조건 위반 확인
        if (e.getMessage().contains("FOREIGN KEY") || e.getMessage().contains("foreign key")) {
            return ResponseEntity.badRequest()
                    .body(new ExceptionResponse("해당 데이터를 삭제하기 전에 연관된 데이터를 먼저 삭제해주세요."));
        }

        return ResponseEntity.badRequest()
                .body(new ExceptionResponse("데이터 처리 중 오류가 발생했습니다."));
    }

    @ExceptionHandler(InvalidPaginationParameterException.class)
    public ResponseEntity<ExceptionResponse
            > handleInvalidPaginationParameterException(InvalidPaginationParameterException e) {
        return ResponseEntity.status(BAD_REQUEST)
                .body(new ExceptionResponse(e.getExceptionType().errorMessage()));
    }
}