package org.example.backend.course.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.course.domain.dto.req.CourseReqDto;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "course_type", nullable = false)
    protected CourseType courseType;

    @Column(name = "course_number", nullable = false)
    protected String courseNumber;

    @Column(name = "course_name", nullable = false)
    protected String courseName;

    @Column(name = "course_name_en")
    protected String courseNameEn;

    @Column(name = "credit_time")
    protected String creditTime;

    protected Course(CourseType courseType, String courseNumber, String courseName, String courseNameEn,
                     String creditTime) {
        this.courseType = courseType;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
    }

    public abstract void update(CourseReqDto dto);
}
