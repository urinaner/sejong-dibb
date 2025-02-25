package org.example.backend.department.domain.entity;

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
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "department")
public class Department extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id", nullable = false)
    private Long id;

    @Column(name = "korean_name", unique = true)
    private String koreanName;

    @Column(name = "english_name", unique = true)
    private String englishName;

    @Column(name = "intro")
    private String intro;

    @Column(name = "phone", unique = true)
    private String phoneN;

    @Column(name = "location")
    private String location;

    @Column(name = "educational_objective")
    private String educationalObjective;

    @Column(name = "work_hour")
    private String workHour;

    @Column(name = "map")
    private String map;

    @Builder
    private Department(String koreanName, String englishName, String intro, String phoneN,
                       String location, String educationalObjective, String workHour, String map) {
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.intro = intro;
        this.phoneN = phoneN;
        this.location = location;
        this.educationalObjective = educationalObjective;
        this.workHour = workHour;
        this.map = map;
    }

    public static Department of(DepartmentReqDto dto) {
        return Department.builder()
                .koreanName(dto.getKoreanName())
                .englishName(dto.getEnglishName())
                .intro(dto.getIntro())
                .phoneN(dto.getPhoneN())
                .location(dto.getLocation())
                .educationalObjective(dto.getEducationalObjective())
                .workHour(dto.getWorkHour())
                .map(dto.getMap())
                .build();
    }

    public void update(DepartmentReqDto dto) {
        this.koreanName = dto.getKoreanName();
        this.englishName = dto.getEnglishName();
        this.intro = dto.getIntro();
        this.phoneN = dto.getPhoneN();
        this.location = dto.getLocation();
        this.educationalObjective = dto.getEducationalObjective();
        this.workHour = dto.getWorkHour();
        this.map = dto.getMap();
    }
}