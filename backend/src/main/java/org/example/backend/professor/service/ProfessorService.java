package org.example.backend.professor.service;

import static org.example.backend.professor.exception.ProfessorExceptionType.NOT_FOUND_PROFESSOR;

import lombok.RequiredArgsConstructor;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.exception.ProfessorException;
import org.example.backend.professor.exception.ProfessorExceptionType;
import org.example.backend.professor.repository.ProfessorRepository;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.service.ThesisService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final ThesisService thesisService;

    @Transactional
    public Long saveProfessor(ProfessorReqDto professorReqDto) {
        validateUserRequiredFields(professorReqDto);
        validateUserUniqueFields(professorReqDto);
        Professor professor = Professor.of(professorReqDto);
        Professor savedProfessor = professorRepository.save(professor);
        return savedProfessor.getId();
    }

    private void validateUserRequiredFields(ProfessorReqDto dto) {
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new ProfessorException(ProfessorExceptionType.REQUIRED_NAME);
        }
    }

    private void validateUserUniqueFields(ProfessorReqDto dto) {
        if (professorRepository.existsByPhoneN(dto.getPhoneN())) {
            throw new ProfessorException(ProfessorExceptionType.DUPLICATE_PHONE);
        }

        if (professorRepository.existsByEmail(dto.getEmail())) {
            throw new ProfessorException(ProfessorExceptionType.DUPLICATE_EMAIL);
        }
    }

    public ProfessorResDto getProfessor(Long professorId) {
        Professor professor = findProfessorById(professorId);
        return ProfessorResDto.of(professor);
    }

    public Page<ProfessorResDto> getAllProfessors(Pageable pageable) {
        return professorRepository.findAll(pageable)
                .map(ProfessorResDto::of);
    }

    @Transactional
    public ProfessorResDto updateProfessor(Long professorId, ProfessorReqDto professorReqDto) {
        Professor professor = findProfessorById(professorId);
        professor.update(professorReqDto);
        return ProfessorResDto.of(professor);
    }

    @Transactional
    public void deleteProfessor(Long professorId) {
        Professor professor = findProfessorById(professorId);
        professorRepository.delete(professor);
    }

    private Professor findProfessorById(Long professorId) {
        return professorRepository.findById(professorId)
                .orElseThrow(() -> new ProfessorException(NOT_FOUND_PROFESSOR));
    }

    public Page<ThesisResDto> getThesisByProfessor(Long professorId, Pageable pageable) {
        professorRepository.findById(professorId)
                .orElseThrow(() -> new ProfessorException(NOT_FOUND_PROFESSOR));
        return thesisService.getThesisByProfessor(professorId, pageable);
    }
}