package org.example.backend.news.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.news.domain.entity.News;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsResDto {
    private Long id;
    private String title;
    private String content;
    private String createDate;
    private String link;
    private String image;

    @Builder
    private NewsResDto(Long id, String title, String content, String createDate,
                       String link, String image) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createDate = createDate;
        this.link = link;
        this.image = image;
    }

    public static NewsResDto of(News seminar) {
        return NewsResDto.builder()
                .id(seminar.getId())
                .title(seminar.getTitle())
                .content(seminar.getContent())
                .createDate(seminar.getCreateDate())
                .link(seminar.getLink())
                .image(seminar.getImage())
                .build();
    }
}