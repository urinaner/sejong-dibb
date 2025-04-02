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
@DiscriminatorValue("GRADUATE")
@Table(name = "graduate_courses")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GraduateCourse extends BaseCourse {

    // 대학원 전용 필드
    @Column(name = "target_program")
    private String targetProgram;

    @Builder
    private GraduateCourse(String courseNumber, String courseName, String courseNameEn, String creditTime,
                           String targetProgram) {
        super(courseNumber, courseName, courseNameEn, creditTime);
        this.targetProgram = targetProgram;
    }

    public static GraduateCourse of(CourseReqDto dto) {
        return GraduateCourse.builder()
                .courseNumber(dto.getCourseNumber())
                .courseName(dto.getCourseName())
                .courseNameEn(dto.getCourseNameEn())
                .creditTime(dto.getCreditTime())
                .targetProgram(dto.getTargetProgram())
                .build();
    }
}

