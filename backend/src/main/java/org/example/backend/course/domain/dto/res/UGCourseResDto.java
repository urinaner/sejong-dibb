package org.example.backend.course.domain.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.CourseType;
import org.example.backend.course.domain.entity.UndergraduateCourse;

@Getter
@NoArgsConstructor
public class UGCourseResDto extends CourseResDto {
    private String academicYearSemester;
    private String classification;
    private String courseDescription;
    private String courseDescriptionEn;

    @Builder
    public UGCourseResDto(Long id, CourseType courseType, String academicYearSemester,
                          String classification, String courseNumber,
                          String courseName, String courseNameEn,
                          String creditTime, String courseDescription,
                          String courseDescriptionEn, String targetProgram) {
        super(id, courseType, courseNumber, courseName, courseNameEn, creditTime);
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
    }

    public static UGCourseResDto of(UndergraduateCourse course) {
        return UGCourseResDto.builder()
                .id(course.getId())
                .academicYearSemester(course.getAcademicYearSemester())
                .classification(course.getClassification())
                .courseNumber(course.getCourseNumber())
                .courseName(course.getCourseName())
                .courseNameEn(course.getCourseNameEn())
                .creditTime(course.getCreditTime())
                .courseDescription(course.getCourseDescription())
                .courseDescriptionEn(course.getCourseDescriptionEn())
                .build();
    }
}
