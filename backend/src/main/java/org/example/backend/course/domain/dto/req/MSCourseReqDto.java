package org.example.backend.course.domain.dto.req;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MSCourseReqDto extends CourseReqDto {
    private String targetProgram;

    @Builder
    public MSCourseReqDto(String courseType, String courseNumber,
                          String courseName, String courseNameEn,
                          int creditTime, int year, int semester,
                          String targetProgram) {
        super(courseType, courseNumber, courseName, courseNameEn, creditTime, year, semester);
        this.targetProgram = targetProgram;
    }
}
