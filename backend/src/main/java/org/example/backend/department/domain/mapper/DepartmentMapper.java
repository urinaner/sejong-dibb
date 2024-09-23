package org.example.backend.department.domain.mapper;

import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;

public interface DepartmentMapper {

    Department toEntity(DepartmentReqDto departmentReqDto);

    DepartmentResDto toDepartmentDto(Department department);

    void updateDepartmentFromDto(DepartmentReqDto departmentReqDto, Department department);
}
