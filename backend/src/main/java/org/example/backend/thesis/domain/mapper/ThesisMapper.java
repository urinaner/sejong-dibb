package org.example.backend.thesis.domain.mapper;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.repository.ProfessorRepository;
import org.example.backend.global.config.CentralMapperConfig;
import org.example.backend.thesis.domain.dto.ThesisReqDto;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.domain.entity.Thesis;
import org.example.backend.thesis.domain.mapper.ThesisMapper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface ThesisMapper {
    
    ThesisMapper INSTANCE = Mappers.getMapper(ThesisMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "professor", expression = "java(mapProfessor(thesisReqDto.getProfessorId(), null, professorRepository))")
    Thesis toEntity(ThesisReqDto thesisReqDto, @Context ProfessorRepository professorRepository);

    ThesisResDto toThesisDto(Thesis thesis);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "professor", expression = "java(mapProfessor(thesisReqDto.getProfessorId(), thesis.getProfessor(), professorRepository))")
    void updateThesisFromDto(ThesisReqDto thesisReqDto, @MappingTarget Thesis thesis, @Context ProfessorRepository professorRepository);

    // Long을 Professor로 매핑하는 헬퍼 메서드 추가
    default Professor mapProfessor(Long professorId, Professor currentProfessor, @Context ProfessorRepository professorRepository) {
        if (professorId == null) {
            return currentProfessor;
        }
        return professorRepository.findById(professorId)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id " + professorId));
    }
}
