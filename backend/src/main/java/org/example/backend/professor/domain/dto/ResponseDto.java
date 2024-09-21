package org.example.backend.professor.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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
