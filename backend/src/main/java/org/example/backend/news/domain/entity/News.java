package org.example.backend.news.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.news.domain.dto.NewsReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    private String createDate;

    @Column(name = "link")
    private String link;

    @Column(name = "image")
    private String image;


    @Builder
    private News(String title, String content, String createDate, String link,
                 String image) {
        this.title = title;
        this.content = content;
        this.createDate = createDate;
        this.link = link;
        this.image = image;
    }

    public static News of(NewsReqDto dto) {
        return News.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .createDate(dto.getCreateDate())
                .link(dto.getLink())
                .image(dto.getImage())
                .build();
    }

    public void update(NewsReqDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.createDate = dto.getCreateDate();
        this.link = dto.getLink();
        this.image = dto.getImage();
    }
}
