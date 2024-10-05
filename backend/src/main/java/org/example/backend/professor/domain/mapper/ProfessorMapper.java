package org.example.backend.professor.domain.mapper;

import org.example.backend.global.config.CentralMapperConfig;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface ProfessorMapper {

    Professor toEntity(ProfessorReqDto professorReqDto);

    ProfessorResDto toProfessorDto(Professor professor);

    void updateProfessorFromDto(ProfessorReqDto professorReqDto, @MappingTarget Professor professor);
}
