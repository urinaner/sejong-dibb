package org.example.backend.course.domain.dto.res;

import org.example.backend.course.domain.entity.BSCourse;
import org.example.backend.course.domain.entity.Course;
import org.example.backend.course.domain.entity.MSCourse;

public class CourseResDtoFactory {
    public static CourseResDto of(Course course) {
        if (course instanceof BSCourse) {
            return BSCourseResDto.of((BSCourse) course);
        } else if (course instanceof MSCourse) {
            return MSCourseResDto.of((MSCourse) course);
        }
        // TODO: 예외 타입 정의하기
        throw new IllegalArgumentException("Unsupported course type: " + course.getClass().getName());
    }
}
