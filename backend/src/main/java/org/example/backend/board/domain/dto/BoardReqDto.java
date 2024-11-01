package org.example.backend.board.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardReqDto {

    private String title;

    private String content;

    private int viewCount;

    private String writer;

    private String file;

    private String createDate;

    private String category;

    private Long departmentId;
}