package org.example.backend.course.domain.dto.req;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BSCourseReqDto extends CourseReqDto {
    private int grade;
    private String classification;
    private String courseDescription;
    private String courseDescriptionEn;

    @Builder
    public BSCourseReqDto(String courseType,
                          String courseNumber,
                          String courseName, String courseNameEn,
                          int creditTime, int year, int semester,
                          int grade,
                          String classification,
                          String courseDescription,
                          String courseDescriptionEn) {
        super(courseType, courseNumber, courseName, courseNameEn, creditTime, year, semester);
        this.grade = grade;
        this.classification = classification;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
    }
}
