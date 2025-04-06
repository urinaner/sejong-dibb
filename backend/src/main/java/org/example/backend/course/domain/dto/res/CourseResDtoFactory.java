package org.example.backend.course.domain.dto.res;

import static org.example.backend.course.exception.CourseExceptionType.COURSE_UNSUPPORTED_TYPE;

import org.example.backend.course.domain.entity.BSCourse;
import org.example.backend.course.domain.entity.Course;
import org.example.backend.course.domain.entity.MSCourse;
import org.example.backend.course.exception.CourseException;

public class CourseResDtoFactory {
    public static CourseResDto of(Course course) {
        if (course instanceof BSCourse) {
            return BSCourseResDto.of((BSCourse) course);
        } else if (course instanceof MSCourse) {
            return MSCourseResDto.of((MSCourse) course);
        }
        throw new CourseException(COURSE_UNSUPPORTED_TYPE);
    }
}
