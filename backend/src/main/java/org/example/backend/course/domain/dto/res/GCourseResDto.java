package org.example.backend.course.domain.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.CourseType;
import org.example.backend.course.domain.entity.GraduateCourse;

@Getter
@NoArgsConstructor
public class GCourseResDto extends CourseResDto {

    private String targetProgram;

    @Builder
    public GCourseResDto(Long id, CourseType courseType, String courseNumber,
                         String courseName, String courseNameEn,
                         String creditTime, String targetProgram) {
        super(id, courseType, courseNumber, courseName, courseNameEn, creditTime);
        this.targetProgram = targetProgram;
    }

    public static GCourseResDto of(GraduateCourse course) {
        return GCourseResDto.builder()
                .id(course.getId())
                .courseNumber(course.getCourseNumber())
                .courseName(course.getCourseName())
                .courseNameEn(course.getCourseNameEn())
                .creditTime(course.getCreditTime())
                .targetProgram(course.getTargetProgram())
                .build();
    }
}
