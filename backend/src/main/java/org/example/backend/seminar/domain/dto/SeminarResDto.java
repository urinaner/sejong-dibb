package org.example.backend.seminar.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.seminar.domain.entity.Seminar;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeminarResDto {
    private Long id;
    private String name;
    private String writer;
    private String place;
    private String startDate;
    private String endDate;
    private String speaker;
    private String company;

    @Builder
    private SeminarResDto(Long id, String name, String writer, String place,
                          String startDate, String endDate, String speaker, String company) {
        this.id = id;
        this.name = name;
        this.writer = writer;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.speaker = speaker;
        this.company = company;
    }

    public static SeminarResDto of(Seminar seminar) {
        return SeminarResDto.builder()
                .id(seminar.getId())
                .name(seminar.getName())
                .writer(seminar.getWriter())
                .place(seminar.getPlace())
                .startDate(seminar.getStartDate())
                .endDate(seminar.getEndDate())
                .speaker(seminar.getSpeaker())
                .company(seminar.getCompany())
                .build();
    }
}