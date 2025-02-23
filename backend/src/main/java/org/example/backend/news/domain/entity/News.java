package org.example.backend.news.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.news.domain.dto.NewsReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "news")
public class News extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id", nullable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "view")
    private int view;

    @Column(name = "link")
    private String link;

    @Column(name = "image", length = 1000)
    private String image;


    @Builder
    private News(String title, String content, int view, String link,
                 String image) {
        this.title = title;
        this.content = content;
        this.view = view;
        this.link = link;
        this.image = image;
    }

    public static News of(NewsReqDto dto) {
        return News.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .view(0)
                .link(dto.getLink())
                .image(dto.getImage())
                .build();
    }

    public void update(NewsReqDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.link = dto.getLink();
        this.image = dto.getImage();
    }
}
