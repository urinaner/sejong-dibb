package org.example.backend.domain.mapper;

import org.example.backend.domain.dto.professor.ProfessorReqDto;
import org.example.backend.domain.dto.professor.ProfessorResDto;
import org.example.backend.domain.entity.Professor;
import org.mapstruct.Mapper;

@Mapper
public interface ProfessorMapper {

    Professor toEntity(ProfessorReqDto professorReqDto);

    ProfessorResDto toProfessorDto(Professor professor);

    void updateProfessorFromDto(ProfessorReqDto professorReqDto, Professor professor);
}
