package org.example.backend.board.domain.dto.reqDto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.backend.board.domain.dto.BoardBaseDto;


@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BoardCreateReqDto extends BoardBaseDto {

    @NotNull
    private Long departmentId;
}
