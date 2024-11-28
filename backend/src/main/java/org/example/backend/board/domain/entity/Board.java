package org.example.backend.board.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.global.util.StringListConverter;

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

    @Convert(converter = StringListConverter.class)
    @Column(name = "file_list", length = 1000)
    private List<String> fileList;

    @Column(name = "created_date_time")
    private LocalDateTime createdDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Builder
    private Board(String title, String content, String writer,
                  List<String> fileList, Category category) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.fileList = fileList;
        this.category = category;
        this.viewCount = 0;
    }

    public static Board of(BoardReqDto dto) {
        return Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(dto.getWriter())
                .fileList(dto.getFileList())
                .category(Category.valueOf(dto.getCategory()))
                .build();
    }

    public void update(BoardReqDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writer = dto.getWriter();
        this.fileList = dto.getFileList();
        this.category = Category.valueOf(dto.getCategory());
    }
}