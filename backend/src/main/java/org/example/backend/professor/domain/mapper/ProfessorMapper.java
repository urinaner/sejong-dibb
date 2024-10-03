package org.example.backend.professor.domain.mapper;

import org.example.backend.global.config.CentralMapperConfig;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface ProfessorMapper {
    ProfessorMapper INSTANCE = Mappers.getMapper(ProfessorMapper.class);

    @Mapping(target = "id", ignore = true)
    Professor toEntity(ProfessorReqDto professorReqDto);

    ProfessorResDto toProfessorDto(Professor professor);
    @Mapping(target = "id", ignore = true)
    void updateProfessorFromDto(ProfessorReqDto professorReqDto, @MappingTarget Professor professor);
}
