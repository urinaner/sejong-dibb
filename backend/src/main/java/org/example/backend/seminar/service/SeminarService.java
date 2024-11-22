package org.example.backend.seminar.service;

import static org.example.backend.seminar.exception.SeminarExceptionType.NOT_FOUND_SEMINAR;

import lombok.RequiredArgsConstructor;
import org.example.backend.seminar.domain.dto.SeminarReqDto;
import org.example.backend.seminar.domain.dto.SeminarResDto;
import org.example.backend.seminar.domain.entity.Seminar;
import org.example.backend.seminar.exception.SeminarException;
import org.example.backend.seminar.exception.SeminarExceptionType;
import org.example.backend.seminar.repository.SeminarRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeminarService {
    private final SeminarRepository seminarRepository;

    @Transactional
    public Long saveSeminar(SeminarReqDto seminarReqDto) {
        validateUserRequiredFields(seminarReqDto);
        Seminar seminar = Seminar.of(seminarReqDto);
        Seminar savedSeminar = seminarRepository.save(seminar);
        return savedSeminar.getId();
    }

    private void validateUserRequiredFields(SeminarReqDto dto) {
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new SeminarException(SeminarExceptionType.REQUIRED_NAME);
        }
    }

    public SeminarResDto getSeminar(Long seminarId) {
        Seminar seminar = findSeminarById(seminarId);
        return SeminarResDto.of(seminar);
    }

    @Transactional
    public SeminarResDto updateSeminar(Long seminarId, SeminarReqDto seminarReqDto) {
        Seminar seminar = findSeminarById(seminarId);
        seminar.update(seminarReqDto);
        return SeminarResDto.of(seminar);
    }

    public void deleteSeminar(Long seminarId) {
        Seminar seminar = findSeminarById(seminarId);
        seminarRepository.delete(seminar);
    }

    private Seminar findSeminarById(Long seminarId) {
        return seminarRepository.findById(seminarId)
                .orElseThrow(() -> new SeminarException(NOT_FOUND_SEMINAR));
    }
}