package org.example.backend.seminar.domain.mapper;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.global.config.CentralMapperConfig;
import org.example.backend.seminar.domain.dto.SeminarReqDto;
import org.example.backend.seminar.domain.dto.SeminarResDto;
import org.example.backend.seminar.domain.entity.Seminar;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface SeminarMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "department", expression = "java(mapDepartment(seminarReqDto.getDepartmentId(), null, departmentRepository))")
    Seminar toEntity(SeminarReqDto seminarReqDto, @Context DepartmentRepository departmentRepository);

    SeminarResDto toSeminarDto(Seminar seminar);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "department", expression = "java(mapDepartment(seminarReqDto.getDepartmentId(), seminar.getDepartment(), departmentRepository))")
    void updateSeminarFromDto(SeminarReqDto seminarReqDto, @MappingTarget Seminar seminar, @Context DepartmentRepository departmentRepository);

    // Long을 Department로 매핑하는 헬퍼 메서드 추가
    default Department mapDepartment(Long departmentId, Department currentDepartment, @Context DepartmentRepository departmentRepository) {
        if (departmentId == null) {
            return currentDepartment;
        }
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id " + departmentId));
    }
}
