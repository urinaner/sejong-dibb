package org.example.backend.course.domain.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.CourseType;
import org.example.backend.course.domain.entity.MSCourse;

@Getter
@NoArgsConstructor
public class MSCourseResDto extends CourseResDto {

    private String targetProgram;

    @Builder
    public MSCourseResDto(Long id, CourseType courseType, String courseNumber,
                          String courseName, String courseNameEn,
                          int creditTime, int year, int semester,
                          String targetProgram) {
        super(id, courseType, courseNumber, courseName, courseNameEn, creditTime, year, semester);
        this.targetProgram = targetProgram;
    }

    public static MSCourseResDto of(MSCourse course) {
        return MSCourseResDto.builder()
                .id(course.getId())
                .courseType(course.getCourseType())
                .courseNumber(course.getCourseNumber())
                .courseName(course.getCourseName())
                .courseNameEn(course.getCourseNameEn())
                .creditTime(course.getCreditTime())
                .year(course.getYear())
                .semester(course.getSemester())
                .targetProgram(course.getTargetProgram())
                .build();
    }
}
