package org.example.backend.professor.domain.mapper;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.global.config.CentralMapperConfig;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface ProfessorMapper {
    ProfessorMapper INSTANCE = Mappers.getMapper(ProfessorMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "department", expression = "java(mapDepartment(professorReqDto.getDepartmentId(), departmentRepository))")
    Professor toEntity(ProfessorReqDto professorReqDto, @Context DepartmentRepository departmentRepository);

    ProfessorResDto toProfessorDto(Professor professor);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "department", expression = "java(mapDepartment(professorReqDto.getDepartmentId(), departmentRepository))")
    void updateProfessorFromDto(ProfessorReqDto professorReqDto, @MappingTarget Professor professor, @Context DepartmentRepository departmentRepository);

    // Long을 Department로 매핑하는 헬퍼 메서드 추가
    default Department mapDepartment(Long departmentId, @Context DepartmentRepository departmentRepository) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id " + departmentId));
    }
}
