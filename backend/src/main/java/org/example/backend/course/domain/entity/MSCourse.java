package org.example.backend.course.domain.entity;

import static org.example.backend.course.exception.CourseExceptionType.NOT_MS_COURSE_REQUEST_DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.dto.req.CourseReqDto;
import org.example.backend.course.domain.dto.req.MSCourseReqDto;
import org.example.backend.course.exception.CourseException;

@Entity
@Table(name = "graduate_courses")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MSCourse extends Course {

    // 대학원 전용 필드
    @Column(name = "target_program")
    private String targetProgram;

    @Builder
    private MSCourse(CourseType courseType, String courseNumber, String courseName, String courseNameEn,
                     String creditTime,
                     String targetProgram) {
        super(courseType, courseNumber, courseName, courseNameEn, creditTime);
        this.targetProgram = targetProgram;
    }

    public static MSCourse of(MSCourseReqDto dto) {
        return MSCourse.builder()
                .courseType(CourseType.valueOf(dto.getCourseType().toUpperCase()))
                .courseNumber(dto.getCourseNumber())
                .courseName(dto.getCourseName())
                .courseNameEn(dto.getCourseNameEn())
                .creditTime(dto.getCreditTime())
                .targetProgram(dto.getTargetProgram())
                .build();
    }

    @Override
    public void update(CourseReqDto dto) {
        if (!(dto instanceof MSCourseReqDto bsDto)) {
            throw new CourseException(NOT_MS_COURSE_REQUEST_DTO);
        }
        super.courseNumber = bsDto.getCourseNumber();
        super.courseName = bsDto.getCourseName();
        super.courseNameEn = bsDto.getCourseNameEn();
        super.creditTime = bsDto.getCreditTime();
        this.targetProgram = bsDto.getTargetProgram();
    }
}

