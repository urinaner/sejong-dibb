package org.example.backend.course.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.course.domain.dto.CourseReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "courses")
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", nullable = false)
    private Long id;

    @Column(name = "academic_year_semester", nullable = false)
    private String academicYearSemester;

    @Column(name = "classification")
    private String classification;

    @Column(name = "course_number")
    private String courseNumber;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_name_en")
    private String courseNameEn;

    @Column(name = "credit_time")
    private String creditTime;

    @Builder
    private Course(String academicYearSemester,
                   String classification,
                   String courseNumber,
                   String courseName,
                   String courseNameEn,
                   String creditTime) {
        this.academicYearSemester = academicYearSemester;
        this.classification = classification;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
    }


    public static Course of(CourseReqDto dto) {
        return Course.builder()
                .academicYearSemester(dto.getAcademicYearSemester())
                .classification(dto.getClassification())
                .courseNumber(dto.getCourseNumber())
                .courseName(dto.getCourseName())
                .courseNameEn(dto.getCourseNameEn())
                .creditTime(dto.getCreditTime())
                .build();
    }


    public void update(CourseReqDto dto) {
        this.academicYearSemester = dto.getAcademicYearSemester();
        this.classification = dto.getClassification();
        this.courseNumber = dto.getCourseNumber();
        this.courseName = dto.getCourseName();
        this.courseNameEn = dto.getCourseNameEn();
        this.creditTime = dto.getCreditTime();
    }
}
