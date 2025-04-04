package org.example.backend.course.service;

import static org.example.backend.course.exception.CourseExceptionType.INVALID_COURSE_DTO_TYPE;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.course.domain.dto.req.BSCourseReqDto;
import org.example.backend.course.domain.dto.req.CourseReqDto;
import org.example.backend.course.domain.dto.req.MSCourseReqDto;
import org.example.backend.course.domain.dto.res.CourseResDto;
import org.example.backend.course.domain.dto.res.CourseResDtoFactory;
import org.example.backend.course.domain.entity.BSCourse;
import org.example.backend.course.domain.entity.Course;
import org.example.backend.course.domain.entity.CourseType;
import org.example.backend.course.domain.entity.MSCourse;
import org.example.backend.course.exception.CourseException;
import org.example.backend.course.exception.CourseExceptionType;
import org.example.backend.course.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseService {

    private final CourseRepository courseRepository;

    @Transactional
    public Long saveCourse(CourseReqDto dto) {
        Course course = null;
        if (dto instanceof BSCourseReqDto bsDto) {
            course = BSCourse.of(bsDto);
        } else if (dto instanceof MSCourseReqDto msDto) {
            course = MSCourse.of(msDto);
        } else {
            throw new CourseException(INVALID_COURSE_DTO_TYPE);
        }
        Course savedCourse = courseRepository.save(course);
        return savedCourse.getId();
    }

    public CourseResDto getCourse(Long courseId) {
        Course course = findCourseById(courseId);
        return CourseResDtoFactory.of(course);
    }

    @Transactional
    public CourseResDto updateCourse(Long courseId, CourseReqDto courseReqDto) {
        Course course = findCourseById(courseId);
        course.update(courseReqDto);
        return CourseResDtoFactory.of(course);
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        Course course = findCourseById(courseId);
        courseRepository.delete(course);
    }

    private Course findCourseById(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new CourseException(CourseExceptionType.NOT_FOUND_COURSE));
    }

    public List<CourseResDto> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(CourseResDtoFactory::of)
                .toList();
    }

    public List<CourseResDto> getCoursesByType(CourseType courseType) {
        return courseRepository.findByCourseType(courseType).stream()
                .map(CourseResDtoFactory::of)
                .toList();
    }
}