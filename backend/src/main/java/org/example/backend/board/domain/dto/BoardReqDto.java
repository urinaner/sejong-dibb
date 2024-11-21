package org.example.backend.board.domain.dto;

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
    private String file;
    private String category;

    @Builder
    private BoardReqDto(String title, String content, String writer,
                        String file, String category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.file = file;
        this.category = category;
    }
}