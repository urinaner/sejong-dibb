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

    @Enumerated(EnumType.STRING)
    @Column(name = "course_type", nullable = false)
    private CourseType courseType;

    // 공통 필드
    @Column(name = "course_number", nullable = false)
    private String courseNumber;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "course_name_en")
    private String courseNameEn;

    @Column(name = "credit_time")
    private String creditTime;

    // 학부 전용
    @Column(name = "academic_year_semester")
    private String academicYearSemester;

    @Column(name = "classification")
    private String classification;

    @Column(name = "course_description", columnDefinition = "TEXT")
    private String courseDescription;

    @Column(name = "course_description_en", columnDefinition = "TEXT")
    private String courseDescriptionEn;

    // 대학원 전용
    @Column(name = "target_program")
    private String targetProgram;

    @Builder
    private Course(CourseType courseType,
                   String academicYearSemester,
                   String classification,
                   String courseNumber,
                   String courseName,
                   String courseNameEn,
                   String creditTime,
                   String courseDescription,
                   String courseDescriptionEn,
                   String targetProgram) {
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

    public static Course of(CourseReqDto dto) {
        return Course.builder()
                .courseType(CourseType.valueOf(dto.getCourseType()))
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
        this.courseType = CourseType.valueOf(dto.getCourseType());
        this.academicYearSemester = dto.getAcademicYearSemester();
        this.classification = dto.getClassification();
        this.courseNumber = dto.getCourseNumber();
        this.courseName = dto.getCourseName();
        this.courseNameEn = dto.getCourseNameEn();
        this.creditTime = dto.getCreditTime();
        this.courseDescription = dto.getCourseDescription();
        this.courseDescriptionEn = dto.getCourseDescriptionEn();
        this.targetProgram = dto.getTargetProgram();
    }
}