package org.example.backend.professor.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.domain.mapper.ProfessorMapper;
import org.example.backend.professor.repository.ProfessorRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfessorService {

    private final ProfessorMapper professorMapper = Mappers.getMapper(ProfessorMapper.class);
    private final ProfessorRepository professorRepository;

    @Transactional
    public Long saveProfessor(ProfessorReqDto professorReqDto) {
        validateUserRequiredFields(professorReqDto);
        validateUserUniqueFields(professorReqDto);
        Professor professor = professorMapper.toEntity(professorReqDto);
        professorRepository.save(professor);
        return professor.getId();
    }

    private void validateUserRequiredFields(ProfessorReqDto dto) {
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new IllegalArgumentException("이름은 필수 입력값입니다.");
        }
    }

    private void validateUserUniqueFields(ProfessorReqDto dto) {
        if (professorRepository.existsByPhoneN(dto.getPhoneN())) {
            throw new IllegalArgumentException("전화번호가 이미 존재합니다.");
        }

        if (professorRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이메일이 이미 존재합니다.");
        }
    }

    public ProfessorResDto getProfessor(Long professorId) {
        Professor professor = findProfessorById(professorId);

        return professorMapper.toProfessorDto(professor);
    }

    @Transactional
    public ProfessorResDto updateProfessor(Long professorId, ProfessorReqDto professorReqDto) {
        Professor professor = findProfessorById(professorId);
        professorMapper.updateProfessorFromDto(professorReqDto, professor);
        professorRepository.save(professor);
        return professorMapper.toProfessorDto(professor);
    }

    public void deleteProfessor(Long professorId) {
        Professor professor = findProfessorById(professorId);
        professorRepository.delete(professor);
    }

    private Professor findProfessorById(Long professorId) {
        return professorRepository.findById(professorId)
                .orElseThrow(() -> new IllegalArgumentException("교수 정보가 존재하지 않습니다."));
    }
}
