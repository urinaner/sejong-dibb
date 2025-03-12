package org.example.backend.seminar.service;

import static org.example.backend.seminar.exception.SeminarExceptionType.NOT_FOUND_SEMINAR;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.seminar.domain.dto.SeminarReqDto;
import org.example.backend.seminar.domain.dto.SeminarResDto;
import org.example.backend.seminar.domain.entity.Seminar;
import org.example.backend.seminar.exception.SeminarException;
import org.example.backend.seminar.repository.SeminarRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeminarService {
    private final SeminarRepository seminarRepository;

    @Transactional
    @CacheEvict(value = "seminars", allEntries = true)
    public Long saveSeminar(SeminarReqDto seminarReqDto) {
        Seminar seminar = Seminar.of(seminarReqDto);
        Seminar savedSeminar = seminarRepository.save(seminar);
        return savedSeminar.getId();
    }

    public SeminarResDto getSeminar(Long seminarId) {
        Seminar seminar = findSeminarById(seminarId);
        return SeminarResDto.of(seminar);
    }

    @Transactional
    @CacheEvict(value = "seminars", allEntries = true)
    public SeminarResDto updateSeminar(Long seminarId, SeminarReqDto seminarReqDto) {
        Seminar seminar = findSeminarById(seminarId);
        seminar.update(seminarReqDto);
        return SeminarResDto.of(seminar);
    }

    @Transactional
    @CacheEvict(value = "seminars", allEntries = true)
    public void deleteSeminar(Long seminarId) {
        Seminar seminar = findSeminarById(seminarId);
        seminarRepository.delete(seminar);
    }

    private Seminar findSeminarById(Long seminarId) {
        return seminarRepository.findById(seminarId)
                .orElseThrow(() -> new SeminarException(NOT_FOUND_SEMINAR));
    }

    @Cacheable(value = "seminars", key = "{#pageable.pageNumber, #pageable.pageSize}")
    public Page<SeminarResDto> getAllSeminars(Pageable pageable) {
        Page<SeminarResDto> seminarResDtos = seminarRepository.findAll(pageable).map(SeminarResDto::of);
        List<SeminarResDto> content = seminarResDtos.getContent();
        for (int i = 0; i < content.size(); i++) {
            content.get(i).setId((long) pageable.getPageNumber() * pageable.getPageSize() + i);
        }
        return seminarResDtos;
    }

    public Page<SeminarResDto> searchSeminar(String keyword, Pageable pageable) {
        return seminarRepository.searchByKeywordFulltext(keyword, pageable)
                .map(SeminarResDto::of);
    }
}