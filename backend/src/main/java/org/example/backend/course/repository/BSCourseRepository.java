package org.example.backend.course.repository;

import java.util.List;
import org.example.backend.course.domain.entity.BSCourse;
import org.example.backend.course.domain.entity.Course;
import org.example.backend.course.domain.entity.CourseType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BSCourseRepository extends JpaRepository<BSCourse, Long> {
    List<Course> findByCourseTypeAndYearAndGrade(CourseType courseType, int year, int grade);
}
