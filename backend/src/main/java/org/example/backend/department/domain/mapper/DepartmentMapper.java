package org.example.backend.department.domain.mapper;

import org.example.backend.global.config.CentralMapperConfig;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface DepartmentMapper {

    @Mapping(target = "departmentId", ignore = true)
    @Mapping(target = "professors", ignore = true) // 양방향 관계로 인해 무시할 수 있습니다.
    Department toEntity(DepartmentReqDto departmentReqDto);

    @Mapping(target = "id", source = "departmentId")
    DepartmentResDto toDepartmentDto(Department department);

    @Mapping(target = "professors", ignore = true) // 필요한 경우 추가적인 로직을 처리
    @Mapping(target = "departmentId", ignore = true)
    void updateDepartmentFromDto(DepartmentReqDto departmentReqDto, @MappingTarget Department department);
}
