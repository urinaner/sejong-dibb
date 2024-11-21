package org.example.backend.board.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.global.config.BaseEntity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board")
public class Board extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id", nullable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "writer")
    private String writer;

    @Column(name = "file")
    private String file;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Builder
    private Board(String title, String content, String writer,
                  String file, Category category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.file = file;
        this.category = category;
        this.viewCount = 0;
    }

    public static Board of(BoardReqDto dto) {
        return Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(dto.getWriter())
                .file(dto.getFile())
                .category(Category.valueOf(dto.getCategory()))
                .build();
    }

    public void update(BoardReqDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writer = dto.getWriter();
        this.file = dto.getFile();
        this.category = Category.valueOf(dto.getCategory());
    }
}