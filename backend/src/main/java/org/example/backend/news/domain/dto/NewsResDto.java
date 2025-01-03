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
    private String writer;
    private String place;
    private String startDate;
    private String endDate;
    private String speaker;
    private String company;

    @Builder
    private NewsResDto(Long id, String title, String writer, String place,
                       String startDate, String endDate, String speaker, String company) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.speaker = speaker;
        this.company = company;
    }

    public static NewsResDto of(News seminar) {
        return NewsResDto.builder()
                .id(seminar.getId())
                .title(seminar.getTitle())
                .writer(seminar.getWriter())
                .place(seminar.getPlace())
                .startDate(seminar.getStartDate())
                .endDate(seminar.getEndDate())
                .speaker(seminar.getSpeaker())
                .company(seminar.getCompany())
                .build();
    }
}