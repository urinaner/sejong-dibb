package org.example.backend.course.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.Course;
import org.example.backend.course.domain.entity.CourseType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseResDto {

    private Long id;
    private CourseType courseType;    private String academicYearSemester;
    private String classification;
    private String courseNumber;
    private String courseName;
    private String courseNameEn;
    private String creditTime;
    private String courseDescription;
    private String courseDescriptionEn;
    private String targetProgram;

    @Builder
    public CourseResDto(Long id,
                        CourseType courseType,
                        String academicYearSemester,
                        String classification,
                        String courseNumber,
                        String courseName,
                        String courseNameEn,
                        String creditTime,
                        String courseDescription,
                        String courseDescriptionEn,
                        String targetProgram) {
        this.id = id;
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

    public static CourseResDto of(Course course) {
        return CourseResDto.builder()
                .id(course.getId())
                .courseType(course.getCourseType())
                .academicYearSemester(course.getAcademicYearSemester())
                .classification(course.getClassification())
                .courseNumber(course.getCourseNumber())
                .courseName(course.getCourseName())
                .courseNameEn(course.getCourseNameEn())
                .creditTime(course.getCreditTime())
                .courseDescription(course.getCourseDescription())
                .courseDescriptionEn(course.getCourseDescriptionEn())
                .targetProgram(course.getTargetProgram())
                .build();
    }
}

