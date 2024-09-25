package org.example.backend.admin.domain.mapper;

import org.example.backend.admin.domain.dto.AdminReqDto;
import org.example.backend.admin.domain.dto.SingInResDto;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;

public interface LogInMapper {
    SingInResDto toEntity(SingInResDto singInResDto);

    SingInResDto toProfessorDto(Professor professor);

    void updateProfessorFromDto(ProfessorReqDto professorReqDto, Professor professor);
}
