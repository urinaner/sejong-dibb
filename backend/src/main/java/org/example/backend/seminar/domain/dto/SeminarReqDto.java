package org.example.backend.seminar.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeminarReqDto {
    private String name;
    private String writer;
    private String place;
    private String startDate;
    private String endDate;
    private String speaker;
    private String company;

    @Builder
    private SeminarReqDto(String name, String writer, String place,
                          String startDate, String endDate, String speaker, String company) {
        this.name = name;
        this.writer = writer;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.speaker = speaker;
        this.company = company;
    }

    public static SeminarReqDto of(String name, String writer, String place,
                                   String startDate, String endDate, String speaker, String company) {
        return SeminarReqDto.builder()
                .name(name)
                .writer(writer)
                .place(place)
                .startDate(startDate)
                .endDate(endDate)
                .speaker(speaker)
                .company(company)
                .build();
    }
}
