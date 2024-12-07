package org.example.backend.board.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardReqDto {
    private String title;
    private String content;
    private String writer;
    @Schema(hidden = true)
    private List<String> fileList;
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