package org.example.backend.board.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardBaseDto {

    private String title;

    private String content;

    private String writer;

    private String file;

    private String createDate;

    private String category;
}
