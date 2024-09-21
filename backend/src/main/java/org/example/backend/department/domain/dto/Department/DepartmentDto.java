package org.example.backend.department.domain.dto.Department;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.department.domain.entity.Department;

@Data
@NoArgsConstructor
public class DepartmentDto {
    private String koreanName;
    private String englishName;
    private String intro;
    private String phoneN;
    private String location;
    private String educationalObjective;
    private String workHour;
    private String map;

    public static DepartmentDto toDepartmentDTO(Department departmentEntity) {
        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setKoreanName(departmentEntity.getKoreanName());
        departmentDto.setEnglishName(departmentEntity.getEnglishName());
        departmentDto.setIntro(departmentEntity.getIntro());
        departmentDto.setPhoneN(departmentEntity.getPhoneN());
        departmentDto.setLocation(departmentEntity.getLocation());
        departmentDto.setEducationalObjective(departmentEntity.getEducationalObjective());
        departmentDto.setWorkHour(departmentEntity.getWorkHour());
        departmentDto.setMap(departmentEntity.getMap());
        return departmentDto;
    }
}
