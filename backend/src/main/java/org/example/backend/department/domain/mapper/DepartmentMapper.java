package org.example.backend.department.domain.mapper;

import org.example.backend.department.domain.dto.Department.DepartmentDto;
import org.example.backend.department.domain.entity.Department;

public interface DepartmentMapper {

    Department toEntity(DepartmentDto departmentDto);

    DepartmentDto toDepartmentDto(DepartmentDto department);

    void updateDepartmentFromDto(DepartmentDto departmentReqDto, Department department);
}
