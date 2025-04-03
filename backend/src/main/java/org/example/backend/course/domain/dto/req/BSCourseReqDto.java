package org.example.backend.course.domain.dto.req;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BSCourseReqDto extends CourseReqDto {
    private String academicYearSemester;
    private String classification;
    private String courseDescription;
    private String courseDescriptionEn;

    @Builder
    public BSCourseReqDto(String courseType, String academicYearSemester,
                          String classification, String courseNumber,
                          String courseName, String courseNameEn,
                          String creditTime, String courseDescription,
                          String courseDescriptionEn) {
        super(courseType, courseNumber, courseName, courseNameEn, creditTime);
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
    }
}
