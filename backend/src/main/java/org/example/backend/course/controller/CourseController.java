package org.example.backend.course.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.course.domain.dto.CourseReqDto;
import org.example.backend.course.domain.dto.res.CourseResDto;
import org.example.backend.course.domain.entity.CourseType;
import org.example.backend.course.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class CourseController {

    private final CourseService courseService;

    @Operation(summary = "강의 생성 API", description = "강의 생성")
    @PostMapping
    public ResponseEntity<Long> createCourse(@RequestBody @Valid CourseReqDto courseReqDto) {
        Long courseId = courseService.saveCourse(courseReqDto);
        return new ResponseEntity<>(courseId, HttpStatus.OK);
    }

    @Operation(summary = "모든 강의 조회 API", description = "전체 강의 리스트 반환 (페이징 없음)")
    @GetMapping
    public ResponseEntity<List<CourseResDto>> getAllCourses() {
        List<CourseResDto> courseList = courseService.getAllCourses();
        return new ResponseEntity<>(courseList, HttpStatus.OK);
    }

    @Operation(summary = "단일 강의 조회 API", description = "단일 강의 상세 정보 반환")
    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResDto> getCourse(@PathVariable(name = "courseId") Long courseId) {
        CourseResDto courseResDto = courseService.getCourse(courseId);
        return new ResponseEntity<>(courseResDto, HttpStatus.OK);
    }

    @Operation(summary = "강의 정보 업데이트 API", description = "강의 정보 업데이트")
    @PostMapping("/{courseId}")
    public ResponseEntity<CourseResDto> updateCourse(@PathVariable(name = "courseId") Long courseId,
                                                     @RequestBody @Valid CourseReqDto courseReqDto) {
        CourseResDto courseResDto = courseService.updateCourse(courseId, courseReqDto);
        return new ResponseEntity<>(courseResDto, HttpStatus.OK);
    }

    @Operation(summary = "강의 삭제 API", description = "강의 삭제")
    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable(name = "courseId") Long courseId) {
        courseService.deleteCourse(courseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/type/{courseType}")
    public ResponseEntity<List<CourseResDto>> getCoursesByType(@PathVariable String courseType) {
        CourseType type = CourseType.valueOf(courseType.toUpperCase());
        return ResponseEntity.ok(courseService.getCoursesByType(type));
    }
}