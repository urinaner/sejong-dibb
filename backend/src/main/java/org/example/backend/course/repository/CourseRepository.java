package org.example.backend.course.repository;

import java.util.List;
import org.example.backend.course.domain.entity.BaseCourse;
import org.example.backend.course.domain.entity.CourseType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<BaseCourse, Long> {
    List<BaseCourse> findByCourseType(CourseType courseType);
}
