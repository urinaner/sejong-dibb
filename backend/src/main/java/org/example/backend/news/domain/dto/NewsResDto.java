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
    private int view;
    private String createDate;
    private String link;
    private String image;

    @Builder
    private NewsResDto(Long id, String title, int view, String content, String createDate,
                       String link, String image) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.view = view;
        this.createDate = createDate;
        this.link = link;
        this.image = image;
    }

    public static NewsResDto of(News news) {
        return NewsResDto.builder()
                .id(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .view(news.getView())
                .createDate(news.getCreateDate())
                .link(news.getLink())
                .image(news.getImage())
                .build();
    }
}