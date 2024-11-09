package org.example.backend.board.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardReqDto {

    @Schema(description = "게시판 제목", example = "게시판 제목 예시", required = true)
    private String title;

    @Schema(description = "게시판 내용", example = "이것은 게시판 내용입니다.", required = true)
    private String content;

    @Schema(description = "첨부 파일", example = "file.pdf")
    private String file;

    @Schema(description = "게시판 카테고리", example = "graduate")
    private String category;

    @Schema(description = "연관된 학과 ID", example = "1", required = true)
    private Long departmentId;
}
