package org.example.backend.board.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardReqDto {

    @NotBlank(message = "제목은 필수 입력값입니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력값입니다.")
    private String content;

    @NotBlank(message = "작성자는 필수 입력값입니다.")
    private String writer;

    @Schema(hidden = true)
    private List<String> fileList;

    @NotBlank(message = "카테고리는 필수 입력값입니다.")
    private String category;

    @Builder
    private BoardReqDto(String title, String content, String writer, String category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.category = category;
    }

    public void setFileList(List<String> fileList) {
        this.fileList = fileList;
    }
}
