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

    @NotBlank(message = "courseType은 필수 입력입니다.")
    private String courseType;

    private String academicYearSemester;
    private String classification;

    @NotBlank
    private String courseNumber;

    @NotBlank
    private String courseName;
    private String courseNameEn;
    private String creditTime;

    private String courseDescription;
    private String courseDescriptionEn;
    private String targetProgram;

    @Builder
    public CourseReqDto(String courseType,
                        String academicYearSemester,
                        String classification,
                        String courseNumber,
                        String courseName,
                        String courseNameEn,
                        String creditTime,
                        String courseDescription,
                        String courseDescriptionEn,
                        String targetProgram) {
        this.courseType = courseType;
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
        this.targetProgram = targetProgram;
    }
}