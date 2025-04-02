package org.example.backend.course.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.dto.CourseReqDto;

@Entity
@Getter
@DiscriminatorValue("UNDERGRADUATE")
@Table(name = "undergraduate_courses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BSCourse extends Course {

    // 학부 전용
    @Column(name = "academic_year_semester")
    private String academicYearSemester;

    @Column(name = "classification")
    private String classification;

    @Column(name = "course_description", columnDefinition = "TEXT")
    private String courseDescription;

    @Column(name = "course_description_en", columnDefinition = "TEXT")
    private String courseDescriptionEn;


    @Builder
    private BSCourse(String academicYearSemester, String classification,
                     String courseNumber,
                     String courseName,
                     String courseNameEn,
                     String creditTime,
                     String courseDescription,
                     String courseDescriptionEn,
                     String targetProgram) {
        super(courseNumber, courseName, courseNameEn, creditTime);
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
    }

    public static BSCourse of(CourseReqDto dto) {
        return BSCourse.builder()
                .academicYearSemester(dto.getAcademicYearSemester())
                .classification(dto.getClassification())
                .courseNumber(dto.getCourseNumber())
                .courseName(dto.getCourseName())
                .courseNameEn(dto.getCourseNameEn())
                .creditTime(dto.getCreditTime())
                .courseDescription(dto.getCourseDescription())
                .courseDescriptionEn(dto.getCourseDescriptionEn())
                .targetProgram(dto.getTargetProgram())
                .build();
    }

    public void update(CourseReqDto dto) {
        this.academicYearSemester = dto.getAcademicYearSemester();
        this.classification = dto.getClassification();
        super.courseNumber = dto.getCourseNumber();
        super.courseName = dto.getCourseName();
        super.courseNameEn = dto.getCourseNameEn();
        super.creditTime = dto.getCreditTime();
        this.courseDescription = dto.getCourseDescription();
        this.courseDescriptionEn = dto.getCourseDescriptionEn();
    }
}