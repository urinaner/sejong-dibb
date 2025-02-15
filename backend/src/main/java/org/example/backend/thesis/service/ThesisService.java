package org.example.backend.thesis.service;

import static org.example.backend.thesis.exception.ThesisExceptionType.NOT_FOUND_THESIS;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.example.backend.global.config.file.LocalFileUploader;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.repository.ProfessorRepository;
import org.example.backend.thesis.domain.dto.ThesisReqDto;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.domain.entity.Thesis;
import org.example.backend.thesis.exception.ThesisException;
import org.example.backend.thesis.repository.ThesisRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ThesisService {
    private final ThesisRepository thesisRepository;
    private final ProfessorRepository professorRepository;
    private final LocalFileUploader localFileUploader;
    private static final String dirName = "image";

    @Value("${server.url}")
    private String serverUrl;

    @Transactional
    public Long saveThesis(ThesisReqDto thesisReqDto, MultipartFile multipartFile) {
        Professor professor = findProfessorById(thesisReqDto.getProfessorId());

        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
            thesisReqDto.setThesisImage(serverUrl + uploadImageUrl);
        }

        Thesis thesis = Thesis.of(thesisReqDto, professor);
        Thesis savedThesis = thesisRepository.save(thesis);

        return savedThesis.getId();
    }


    private Professor findProfessorById(Long professorId) {
        return professorRepository.findById(professorId).orElse(null);
    }

    public ThesisResDto getThesis(Long thesisId) {
        Thesis thesis = findThesisById(thesisId);
        return ThesisResDto.of(thesis);
    }

    public Page<ThesisResDto> getAllTheses(Pageable pageable) {
        return thesisRepository.findAll(pageable)
                .map(ThesisResDto::of);
    }

    @Transactional
    public ThesisResDto updateThesis(Long thesisId, ThesisReqDto thesisReqDto, MultipartFile multipartFile) {
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
            thesisReqDto.setThesisImage(uploadImageUrl);
        }

        Thesis thesis = findThesisById(thesisId);
        Professor professor = findProfessorById(thesisReqDto.getProfessorId());
        thesis.update(thesisReqDto, professor);
        return ThesisResDto.of(thesis);
    }

    public Page<ThesisResDto> getThesisByProfessor(Long professorId, Pageable pageable) {
        return thesisRepository.findByProfessorId(professorId, pageable)
                .map(ThesisResDto::of);
    }

    @Transactional
    public void deleteThesis(Long thesisId) {
        Thesis thesis = findThesisById(thesisId);
        thesisRepository.delete(thesis);
    }

    private Thesis findThesisById(Long thesisId) {
        return thesisRepository.findById(thesisId)
                .orElseThrow(() -> new ThesisException(NOT_FOUND_THESIS));
    }

    public Page<ThesisResDto> searchThesis(String keyword, Pageable pageable) {
        return thesisRepository.searchByKeyword(keyword, pageable)
                .map(ThesisResDto::of);
    }
}