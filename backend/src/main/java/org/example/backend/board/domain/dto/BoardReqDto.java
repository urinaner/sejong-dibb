package org.example.backend.board.domain.dto;

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
    private List<String> fileList;
    private String category;

    @Builder
    private BoardReqDto(String title, String content, String writer,
                        List<String> fileList, String category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.fileList = fileList;
        this.category = category;
    }

    public void setFileList(List<String> fileList) {
        this.fileList = fileList;
    }
}