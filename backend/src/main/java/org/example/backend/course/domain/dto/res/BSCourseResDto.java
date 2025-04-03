package org.example.backend.course.domain.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.BSCourse;
import org.example.backend.course.domain.entity.CourseType;

@Getter
@NoArgsConstructor
public class BSCourseResDto extends CourseResDto {
    private String academicYearSemester;
    private String classification;
    private String courseDescription;
    private String courseDescriptionEn;

    @Builder
    public BSCourseResDto(Long id, CourseType courseType, String academicYearSemester,
                          String classification, String courseNumber,
                          String courseName, String courseNameEn,
                          String creditTime, String courseDescription,
                          String courseDescriptionEn) {
        super(id, courseType, courseNumber, courseName, courseNameEn, creditTime);
        this.academicYearSemester = academicYearSemester;
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
                .academicYearSemester(course.getAcademicYearSemester())
                .classification(course.getClassification())
                .courseDescription(course.getCourseDescription())
                .courseDescriptionEn(course.getCourseDescriptionEn())
                .build();
    }
}
