package org.example.backend.seminar.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.utils.TimeParsingUtils;
import org.example.backend.seminar.domain.entity.Seminar;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeminarResDto {
    private Long id;
    private String name;
    private String writer;
    private String place;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private String startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private String endTime;
    private String speaker;
    private String company;

    @Builder
    private SeminarResDto(Long id, String name, String writer, String place,
                          String startTime, String endTime, String speaker, String company) {
        this.id = id;
        this.name = name;
        this.writer = writer;
        this.place = place;
        this.startTime = startTime;
        this.endTime = endTime;
        this.speaker = speaker;
        this.company = company;
    }

    public static SeminarResDto of(Seminar seminar) {
        return SeminarResDto.builder()
                .id(seminar.getId())
                .name(seminar.getName())
                .writer(seminar.getWriter())
                .place(seminar.getPlace())
                .startTime(TimeParsingUtils.formatterString(seminar.getStartTime()))
                .endTime(TimeParsingUtils.formatterString(seminar.getEndTime()))
                .speaker(seminar.getSpeaker())
                .company(seminar.getCompany())
                .build();
    }

    public void setId(Long id) {
        this.id = id;
    }
}