package org.example.backend.course.domain.entity;

import static org.example.backend.course.exception.CourseExceptionType.NOT_BS_COURSE_REQUEST_DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.dto.req.BSCourseReqDto;
import org.example.backend.course.domain.dto.req.CourseReqDto;
import org.example.backend.course.exception.CourseException;

@Entity
@Getter
@Table(name = "undergraduate_courses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BSCourse extends Course {

    // 학부 전용 필드
    @Column(name = "grade")
    private int grade;

    @Column(name = "classification")
    private String classification;

    @Column(name = "course_description", columnDefinition = "TEXT")
    private String courseDescription;

    @Column(name = "course_description_en", columnDefinition = "TEXT")
    private String courseDescriptionEn;


    @Builder
    private BSCourse(CourseType courseType, String courseNumber, String courseName,
                     String courseNameEn, int creditTime, int year, int semester,
                     int grade, String classification,
                     String courseDescription, String courseDescriptionEn) {
        super(courseType, courseNumber, courseName, courseNameEn, creditTime, year, semester);
        this.grade = grade;
        this.classification = classification;
        this.courseDescription = courseDescription;
        this.courseDescriptionEn = courseDescriptionEn;
    }

    public static BSCourse of(BSCourseReqDto dto) {
        return BSCourse.builder()
                .courseType(CourseType.valueOf(dto.getCourseType().toUpperCase()))
                .courseNumber(dto.getCourseNumber())
                .courseName(dto.getCourseName())
                .courseNameEn(dto.getCourseNameEn())
                .creditTime(dto.getCreditTime())
                .year(dto.getYear())
                .semester(dto.getSemester())
                .grade(dto.getGrade())
                .classification(dto.getClassification())
                .courseDescription(dto.getCourseDescription())
                .courseDescriptionEn(dto.getCourseDescriptionEn())
                .build();
    }

    @Override
    public void update(CourseReqDto dto) {
        if (!(dto instanceof BSCourseReqDto bsDto)) {
            throw new CourseException(NOT_BS_COURSE_REQUEST_DTO);
        }
        super.courseNumber = bsDto.getCourseNumber();
        super.courseName = bsDto.getCourseName();
        super.courseNameEn = bsDto.getCourseNameEn();
        super.creditTime = bsDto.getCreditTime();
        super.year = bsDto.getYear();
        super.semester = bsDto.getSemester();
        this.grade = bsDto.getGrade();
        this.classification = bsDto.getClassification();
        this.courseDescription = bsDto.getCourseDescription();
        this.courseDescriptionEn = bsDto.getCourseDescriptionEn();
    }
}
