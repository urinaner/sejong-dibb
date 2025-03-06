package org.example.backend.seminar.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.common.utils.TimeParsingUtils;
import org.example.backend.seminar.domain.dto.SeminarReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Seminar extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seminar_id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "writer")
    private String writer;

    @Column(name = "place")
    private String place;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "speaker")
    private String speaker;

    @Column(name = "company")
    private String company;

    @Builder
    private Seminar(String name, String writer, String place, LocalDateTime startTime, LocalDateTime endTime,
                    String speaker, String company) {
        this.name = name;
        this.writer = writer;
        this.place = place;
        this.startTime = startTime;
        this.endTime = endTime;
        this.speaker = speaker;
        this.company = company;
    }

    public static Seminar of(SeminarReqDto dto) {
        return Seminar.builder()
                .name(dto.getName())
                .writer(dto.getWriter())
                .place(dto.getPlace())
                .startTime(TimeParsingUtils.formatterLocalDateTime(String.valueOf(dto.getStartTime())))
                .endTime(TimeParsingUtils.formatterLocalDateTime(String.valueOf(dto.getEndTime())))
                .speaker(dto.getSpeaker())
                .company(dto.getCompany())
                .build();
    }

    public void update(SeminarReqDto dto) {
        this.name = dto.getName();
        this.writer = dto.getWriter();
        this.place = dto.getPlace();
        this.startTime = TimeParsingUtils.formatterLocalDateTime(String.valueOf(dto.getStartTime()));
        this.endTime = TimeParsingUtils.formatterLocalDateTime(String.valueOf(dto.getEndTime()));
        this.speaker = dto.getSpeaker();
        this.company = dto.getCompany();
    }
}
