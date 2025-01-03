package org.example.backend.news.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsReqDto {
    private String title;
    private String content;
    private String createDate;
    private String link;
    private String image;

    @Builder
    private NewsReqDto(String title, String content, String createDate,
                       String link, String image) {
        this.title = title;
        this.content = content;
        this.createDate = createDate;
        this.link = link;
        this.image = image;
    }

    public static NewsReqDto of(String title, String content, String createDate,
                                String link, String image) {
        return NewsReqDto.builder()
                .title(title)
                .content(content)
                .createDate(createDate)
                .link(link)
                .image(image)
                .build();
    }
}
