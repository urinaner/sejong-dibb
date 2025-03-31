package org.example.backend.course.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.Course;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseResDto {

    private Long id;
    private String academicYearSemester;
    private String classification;
    private String courseNumber;
    private String courseName;
    private String courseNameEn;
    private String creditTime;

    @Builder
    private CourseResDto(Long id,
                         String academicYearSemester,
                         String classification,
                         String courseNumber,
                         String courseName,
                         String courseNameEn,
                         String creditTime) {
        this.id = id;
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
    }

    public static CourseResDto of(Course course) {
        return CourseResDto.builder()
                .id(course.getId())
                .academicYearSemester(course.getAcademicYearSemester())
                .classification(course.getClassification())
                .courseNumber(course.getCourseNumber())
                .courseName(course.getCourseName())
                .courseNameEn(course.getCourseNameEn())
                .creditTime(course.getCreditTime())
                .build();
    }
}
