package org.example.backend.department.domain.mapper;

import org.example.backend.config.CentralMapperConfig;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(config = CentralMapperConfig.class)
public interface DepartmentMapper {

    Department toEntity(DepartmentReqDto departmentReqDto);

    DepartmentResDto toDepartmentDto(Department department);

    void updateDepartmentFromDto(DepartmentReqDto departmentReqDto, @MappingTarget Department department);
}
