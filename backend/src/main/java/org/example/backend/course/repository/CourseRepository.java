package org.example.backend.course.repository;

import java.util.List;
import org.example.backend.course.domain.entity.Course;
import org.example.backend.course.domain.entity.CourseType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCourseType(CourseType courseType);
}
