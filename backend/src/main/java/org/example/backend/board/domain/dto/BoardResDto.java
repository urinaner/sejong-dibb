package org.example.backend.board.domain.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.board.domain.entity.Board;
import org.example.backend.common.utils.TimeParsingUtils;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardResDto {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private List<String> fileList;
    private String createdDate;
    private int viewCount;
    private String category;

    @Builder
    private BoardResDto(Long id, String title, String content, String writer,
                        List<String> fileList, String createdDate, int viewCount, String category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.fileList = fileList;
        this.createdDate = createdDate;
        this.viewCount = viewCount;
        this.category = category;
    }

    public static BoardResDto of(Board board) {
        return BoardResDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .writer(board.getWriter())
                .fileList(board.getFileList())
                .createdDate(TimeParsingUtils.toRelativeTimeFormat(board.getCreatedDate()))
                .viewCount(board.getViewCount())
                .category(board.getCategory().name())
                .build();
    }
}
