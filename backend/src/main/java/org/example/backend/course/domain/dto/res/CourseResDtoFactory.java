package org.example.backend.course.domain.dto.res;

import org.example.backend.course.domain.entity.BaseCourse;
import org.example.backend.course.domain.entity.GraduateCourse;
import org.example.backend.course.domain.entity.UndergraduateCourse;

public class CourseResDtoFactory {
    public static CourseResDto of(BaseCourse course) {
        if (course instanceof UndergraduateCourse) {
            return UGCourseResDto.of((UndergraduateCourse) course);
        } else if (course instanceof GraduateCourse) {
            return GCourseResDto.of((GraduateCourse) course);
        }
        // TODO: 예외 타입 정의하기
        throw new IllegalArgumentException("Unsupported course type: " + course.getClass().getName());
    }
}
