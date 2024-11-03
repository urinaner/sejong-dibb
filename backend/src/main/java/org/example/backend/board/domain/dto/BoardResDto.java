package org.example.backend.board.domain.dto;

import lombok.Data;

@Data
public class BoardResDto {

    private Long id;

    private String title;

    private String content;

    private int viewCount;

    private String writer;

    private String file;

    private String createDate;

    private String category;

}
