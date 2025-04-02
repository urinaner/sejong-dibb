package org.example.backend.course.domain.dto.res;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.CourseType;

@Getter
@NoArgsConstructor
public abstract class CourseResDto {
    protected Long id;
    protected CourseType courseType;
    protected String courseNumber;
    protected String courseName;
    protected String courseNameEn;
    protected String creditTime;

    protected CourseResDto(Long id, CourseType courseType, String courseNumber,
                           String courseName, String courseNameEn,
                           String creditTime) {
        this.id = id;
        this.courseType = courseType;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
    }
}
