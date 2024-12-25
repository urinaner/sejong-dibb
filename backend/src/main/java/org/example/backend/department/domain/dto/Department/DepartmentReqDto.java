package org.example.backend.department.domain.dto.Department;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepartmentReqDto {

    @NotBlank(message = "한글 이름은 필수 입력값입니다.")
    @Size(max = 255, message = "한글 이름은 최대 255자까지 입력 가능합니다.")
    private String koreanName;

    @Size(max = 255, message = "영문 이름은 최대 255자까지 입력 가능합니다.")
    private String englishName;

    private String intro;

    @Size(max = 15, message = "전화번호는 최대 15자까지 입력 가능합니다.")
    private String phoneN;

    @Size(max = 255, message = "위치는 최대 255자까지 입력 가능합니다.")
    private String location;

    private String educationalObjective;

    @Size(max = 255, message = "근무 시간은 최대 255자까지 입력 가능합니다.")
    private String workHour;

    @Size(max = 2083, message = "지도 링크는 최대 2083자까지 입력 가능합니다.")
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
