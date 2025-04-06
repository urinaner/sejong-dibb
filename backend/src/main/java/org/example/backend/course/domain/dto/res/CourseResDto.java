package org.example.backend.course.domain.dto.res;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.course.domain.entity.CourseType;

@Getter
@NoArgsConstructor
public abstract class CourseResDto {
    protected Long id;
    protected String courseType;
    protected String courseNumber;
    protected String courseName;
    protected String courseNameEn;
    protected int creditTime;
    protected int year;
    protected int semester;

    protected CourseResDto(Long id, CourseType courseType, String courseNumber,
                           String courseName, String courseNameEn,
                           int creditTime, int year, int semester) {
        this.id = id;
        this.courseType = courseType.name();
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
        this.year = year;
        this.semester = semester;
    }
}
