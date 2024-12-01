package org.example.backend.common.dto;

import lombok.*;

@Getter
public class ResponseDto<T> {
    private String message;
    private int page;
    private int totalPage;
    private T data;

    public ResponseDto(String message, int page, int totalPage, T data) {
        this.message = message;
        this.page = page;
        this.totalPage = totalPage;
        this.data = data;
    }
    public static <T> ResponseDto<T> of(String message, int page, int totalPage, T data) {
        return new ResponseDto<>(message, page, totalPage, data);
    }

    public static <T> ResponseDto<T> ok(int page, int totalPage, T data) {
        return of("조회성공", page, totalPage, data);
    }
}
