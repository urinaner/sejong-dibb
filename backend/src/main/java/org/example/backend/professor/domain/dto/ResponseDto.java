package org.example.backend.professor.domain.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Builder
public class ResponseDto {

    private String response;

    private String message;

    private Object data;

    public ResponseDto(String response, String message, Object data) {
        this.response = response;
        this.message = message;
        this.data = data;
    }
}
