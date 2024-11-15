package org.example.backend.thesis.service;

import static org.example.backend.thesis.exception.ThesisExceptionType.NOT_FOUND_THESIS;

import lombok.RequiredArgsConstructor;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.professor.repository.ProfessorRepository;
import org.example.backend.thesis.domain.dto.ThesisReqDto;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.domain.entity.Thesis;
import org.example.backend.thesis.domain.mapper.ThesisMapper;
import org.example.backend.thesis.exception.ThesisException;
import org.example.backend.thesis.exception.ThesisExceptionType;
import org.example.backend.thesis.repository.ThesisRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ThesisService {

    private final ThesisMapper thesisMapper = Mappers.getMapper(ThesisMapper.class);
    private final ThesisRepository thesisRepository;
    private final ProfessorRepository professorRepository;

    @Transactional
    public Long saveThesis(ThesisReqDto thesisReqDto) {
        validateUserRequiredFields(thesisReqDto);
        Thesis thesis = thesisMapper.toEntity(thesisReqDto, professorRepository);
        Thesis savedThesis = thesisRepository.save(thesis);
        return savedThesis.getId();
    }

    private void validateUserRequiredFields(ThesisReqDto dto) {
        if (dto.getAuthor() == null || dto.getAuthor().isEmpty()) {
            throw new ThesisException(ThesisExceptionType.REQUIRED_AUTHOR);
        }
    }

    public ThesisResDto getThesis(Long thesisId) {
        Thesis thesis = findThesisById(thesisId);

        return thesisMapper.toThesisDto(thesis);
    }
    public Page<ThesisResDto> getAllBoards(Pageable pageable) {
        return thesisRepository.findAll(pageable)
                .map(thesisMapper::toThesisDto);
    }

    @Transactional
    public ThesisResDto updateThesis(Long thesisId, ThesisReqDto thesisReqDto) {
        Thesis thesis = findThesisById(thesisId);

        thesisMapper.updateThesisFromDto(thesisReqDto, thesis, professorRepository);

        thesisRepository.save(thesis);
        return thesisMapper.toThesisDto(thesis);
    }

    public Page<ThesisResDto> getThesisByProfessor(Long professorId, Pageable pageable) {
        return thesisRepository.findByProfessorId(professorId, pageable)
                .map(thesisMapper::toThesisDto);
    }

    public void deleteThesis(Long thesisId) {
        Thesis thesis = findThesisById(thesisId);
        thesisRepository.delete(thesis);
    }

    private Thesis findThesisById(Long thesisId) {
        return thesisRepository.findById(thesisId)
                .orElseThrow(() -> new ThesisException(NOT_FOUND_THESIS));
    }
}
