package org.example.backend.board.domain.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonPropertyOrder({"id"})
public class BoardResDto extends BoardBaseDto {

    private Long id;
}
