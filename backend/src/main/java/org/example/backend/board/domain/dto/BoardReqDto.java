package org.example.backend.board.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardReqDto {

    @Schema(description = "게시판 제목", example = "게시판 제목 예시", required = true)
    private String title;

    @Schema(description = "게시판 내용", example = "이것은 게시판 내용입니다.", required = true)
    private String content;

    @Schema(description = "게시판 작성자", example = "홍길동")
    private String writer;

    @Schema(description = "첨부 파일", example = "file.pdf")
    private String file;

    @Schema(description = "게시판 생성일", example = "2024-11-09")
    private String createDate;

    @Schema(description = "게시판 카테고리", example = "일반")
    private String category;

    @Schema(description = "연관된 학과 ID", example = "123", required = true)
    private Long departmentId;
}
