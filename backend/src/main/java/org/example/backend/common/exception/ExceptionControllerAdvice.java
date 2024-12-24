package org.example.backend.common.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
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

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ExceptionResponse> bindException(BindException e) {
        return ResponseEntity.status(BAD_REQUEST)
                .body(new ExceptionResponse(e.getBindingResult().getAllErrors().get(0).getDefaultMessage()));
    }
}