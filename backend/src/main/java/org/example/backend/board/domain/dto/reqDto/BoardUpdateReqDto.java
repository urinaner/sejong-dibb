package org.example.backend.board.domain.dto.reqDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.backend.board.domain.dto.BoardBaseDto;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BoardUpdateReqDto extends BoardBaseDto {
}
