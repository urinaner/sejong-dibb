package org.example.backend.news.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsReqDto {

    @NotBlank(message = "제목은 필수 입력값입니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력값입니다.")
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
