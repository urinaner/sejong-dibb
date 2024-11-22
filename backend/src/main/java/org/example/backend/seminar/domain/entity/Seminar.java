package org.example.backend.seminar.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.seminar.domain.dto.SeminarReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Seminar {

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

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "speaker")
    private String speaker;

    @Column(name = "company")
    private String company;

    @Builder
    private Seminar(String name, String writer, String place, String startDate,
                    String endDate, String speaker, String company) {
        this.name = name;
        this.writer = writer;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.speaker = speaker;
        this.company = company;
    }

    public static Seminar of(SeminarReqDto dto) {
        return Seminar.builder()
                .name(dto.getName())
                .writer(dto.getWriter())
                .place(dto.getPlace())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .speaker(dto.getSpeaker())
                .company(dto.getCompany())
                .build();
    }

    public void update(SeminarReqDto dto) {
        this.name = dto.getName();
        this.writer = dto.getWriter();
        this.place = dto.getPlace();
        this.startDate = dto.getStartDate();
        this.endDate = dto.getEndDate();
        this.speaker = dto.getSpeaker();
        this.company = dto.getCompany();
    }
}
