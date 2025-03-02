package org.example.backend.professor.service;

import static org.example.backend.professor.exception.ProfessorExceptionType.NOT_FOUND_PROFESSOR;

import lombok.RequiredArgsConstructor;
import org.example.backend.global.config.file.LocalFileUploader;
import org.example.backend.professor.domain.dto.ProfessorReqDto;
import org.example.backend.professor.domain.dto.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.exception.ProfessorException;
import org.example.backend.professor.exception.ProfessorExceptionType;
import org.example.backend.professor.repository.ProfessorRepository;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.service.ThesisService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final ThesisService thesisService;
    private final LocalFileUploader localFileUploader;
    private static final String dirName = "profile";

    @Value("${server.url}")
    private String serverUrl;
    @Transactional
    public Long saveProfessor(ProfessorReqDto professorReqDto, MultipartFile multipartFile) {
        validateUserUniqueFields(professorReqDto);

        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
            professorReqDto.setProfileImage(serverUrl + uploadImageUrl);
        }

        Professor professor = Professor.of(professorReqDto);
        Professor savedProfessor = professorRepository.save(professor);

        return savedProfessor.getId();
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
    public ProfessorResDto updateProfessor(Long professorId, ProfessorReqDto professorReqDto, MultipartFile multipartFile) {
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
            professorReqDto.setProfileImage(serverUrl + uploadImageUrl);
        }
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
