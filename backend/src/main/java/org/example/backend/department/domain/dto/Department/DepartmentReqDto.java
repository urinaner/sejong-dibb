package org.example.backend.department.domain.dto.Department;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepartmentReqDto {
    private String koreanName;
    private String englishName;
    private String intro;
    private String phoneN;
    private String location;
    private String educationalObjective;
    private String workHour;
    private String map;

    @Builder
    private DepartmentReqDto(String koreanName, String englishName, String intro, String phoneN,
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

    public static DepartmentReqDto of(String koreanName, String englishName, String intro, String phoneN,
                                      String location, String educationalObjective, String workHour, String map) {
        return DepartmentReqDto.builder()
                .koreanName(koreanName)
                .englishName(englishName)
                .intro(intro)
                .phoneN(phoneN)
                .location(location)
                .educationalObjective(educationalObjective)
                .workHour(workHour)
                .map(map)
                .build();
    }
}
