package org.example.backend.course.domain.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.BSCourse;
import org.example.backend.course.domain.entity.CourseType;

@Getter
@NoArgsConstructor
public class BSCourseResDto extends CourseResDto {
    private int grade;
    private String classification;
    private String courseDescription;
    private String courseDescriptionEn;

    @Builder
    public BSCourseResDto(Long id, CourseType courseType,
                          String courseNumber, String courseName, String courseNameEn,
                          int creditTime, int year, int semester,
                          int grade,
                          String courseDescription,
                          String courseDescriptionEn, String classification) {
        super(id, courseType, courseNumber, courseName, courseNameEn, creditTime, year, semester);
        this.grade = grade;
        this.classification = classification;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
    }

    public static BSCourseResDto of(BSCourse course) {
        return BSCourseResDto.builder()
                .id(course.getId())
                .courseType(course.getCourseType())
                .courseNumber(course.getCourseNumber())
                .courseName(course.getCourseName())
                .courseNameEn(course.getCourseNameEn())
                .creditTime(course.getCreditTime())
                .year(course.getYear())
                .semester(course.getSemester())
                .grade(course.getGrade())
                .classification(course.getClassification())
                .courseDescription(course.getCourseDescription())
                .courseDescriptionEn(course.getCourseDescriptionEn())
                .build();
    }
}
