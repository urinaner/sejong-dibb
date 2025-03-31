package org.example.backend.course.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseReqDto {

    @NotBlank(message = "학년/학기 정보는 필수 입력값입니다.")
    @Size(max = 10, message = "학년/학기 정보는 최대 10자까지 입력 가능합니다.")
    private String academicYearSemester;

    @Size(max = 50, message = "이수구분은 최대 50자까지 입력 가능합니다.")
    private String classification;

    @NotBlank(message = "학수번호는 필수 입력값입니다.")
    @Size(max = 20, message = "학수번호는 최대 20자까지 입력 가능합니다.")
    private String courseNumber;

    @NotBlank(message = "과목명은 필수 입력값입니다.")
    @Size(max = 100, message = "과목명은 최대 100자까지 입력 가능합니다.")
    private String courseName;

    @Size(max = 100, message = "영문 과목명은 최대 100자까지 입력 가능합니다.")
    private String courseNameEn;

    @Size(max = 20, message = "학점(시간)은 최대 20자까지 입력 가능합니다.")
    private String creditTime;

    @Builder
    private CourseReqDto(String academicYearSemester,
                         String classification,
                         String courseNumber,
                         String courseName,
                         String courseNameEn,
                         String creditTime) {
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
    }

    public static CourseReqDto of(String academicYearSemester,
                                  String classification,
                                  String courseNumber,
                                  String courseName,
                                  String courseNameEn,
                                  String creditTime) {
        return CourseReqDto.builder()
                .academicYearSemester(academicYearSemester)
                .classification(classification)
                .courseNumber(courseNumber)
                .courseName(courseName)
                .courseNameEn(courseNameEn)
                .creditTime(creditTime)
                .build();
    }
}
