package org.example.backend.department.domain.dto.Department;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepartmentResDto {
    private Long id;
    private String koreanName;
    private String englishName;
    private String intro;
    private String phoneN;
    private String location;
    private String educationalObjective;
    private String workHour;
    private String map;
}
