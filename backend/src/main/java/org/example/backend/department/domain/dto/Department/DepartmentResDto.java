package org.example.backend.department.domain.dto.Department;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.department.domain.entity.Department;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepartmentResDto {
    private Long id;
    private String koreanName;
    private String englishName;
    private String intro;
    private String phoneN;
    private String location;
    private String educationalObjective;
    private String workHour;
    private String map;

    @Builder
    private DepartmentResDto(Long id, String koreanName, String englishName, String intro, String phoneN,
                             String location, String educationalObjective, String workHour, String map) {
        this.id = id;
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.intro = intro;
        this.phoneN = phoneN;
        this.location = location;
        this.educationalObjective = educationalObjective;
        this.workHour = workHour;
        this.map = map;
    }

    public static DepartmentResDto of(Department department) {
        return DepartmentResDto.builder()
                .id(department.getId())
                .koreanName(department.getKoreanName())
                .englishName(department.getEnglishName())
                .intro(department.getIntro())
                .phoneN(department.getPhoneN())
                .location(department.getLocation())
                .educationalObjective(department.getEducationalObjective())
                .workHour(department.getWorkHour())
                .map(department.getMap())
                .build();
    }
}