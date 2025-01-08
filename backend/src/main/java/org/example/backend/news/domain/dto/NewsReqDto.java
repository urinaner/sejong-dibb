package org.example.backend.news.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsReqDto {

    @NotBlank(message = "제목은 필수 입력값입니다.")
    @Size(max = 200, message = "제목은 최대 200자 입력 가능합니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력값입니다.")
    @Size(max = 5000, message = "내용은 최대 5000자까지 입력 가능합니다.")
    private String content;
    private String link;
    private String image;

    @Builder
    private NewsReqDto(String title, String content,
                       String link, String image) {
        this.title = title;
        this.content = content;
        this.link = link;
        this.image = image;
    }

    public static NewsReqDto of(String title, String content,
                                String link, String image) {
        return NewsReqDto.builder()
                .title(title)
                .content(content)
                .link(link)
                .image(image)
                .build();
    }

    public void setImage(String image) {
        this.image = image;
    }
}
