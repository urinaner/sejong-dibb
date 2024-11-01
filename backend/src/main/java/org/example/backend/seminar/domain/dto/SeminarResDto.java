package org.example.backend.seminar.domain.dto;

import lombok.Data;

@Data
public class SeminarResDto {

    private String name;

    private String writer;

    private String place;

    private String startDate;

    private String endDate;

    private String speaker;

    private String company;

    private Long departmentId;
}
