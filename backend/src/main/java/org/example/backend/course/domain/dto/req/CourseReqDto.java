package org.example.backend.course.domain.dto.req;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "courseType", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = BSCourseReqDto.class, name = "UNDERGRADUATE"),
        @JsonSubTypes.Type(value = MSCourseReqDto.class, name = "GRADUATE")
})
public abstract class CourseReqDto {

    @NotBlank(message = "courseType은 필수 입력입니다.")
    protected String courseType; // "UNDERGRADUATE" or "GRADUATE"

    @NotBlank
    protected String courseNumber;

    @NotBlank
    protected String courseName;

    protected String courseNameEn;

    protected int creditTime;

    protected int year;

    protected int semester;

    protected CourseReqDto(String courseType, String courseNumber,
                           String courseName, String courseNameEn,
                           int creditTime, int year, int semester) {
        this.courseType = courseType;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseNameEn = courseNameEn;
        this.creditTime = creditTime;
        this.year = year;
        this.semester = semester;
    }
}