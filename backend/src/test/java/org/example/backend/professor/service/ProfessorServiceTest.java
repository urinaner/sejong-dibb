package org.example.backend.professor.service;

import org.example.backend.IntegrationTestSupport;
import org.example.backend.professor.domain.dto.ProfessorReqDto;
import org.example.backend.professor.domain.dto.ProfessorResDto;
import org.example.backend.professor.domain.entity.ProfessorTypes;
import org.example.backend.professor.exception.ProfessorException;
import org.example.backend.professor.exception.ProfessorExceptionType;
import org.example.backend.professor.repository.ProfessorRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

public class ProfessorServiceTest extends IntegrationTestSupport {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private ProfessorService professorService;

    @AfterEach
    void init() {
        professorRepository.deleteAllInBatch();
    }

    @Test
    @DisplayName("교수 저장 테스트")
    void saveProfessor() {
        // given
        ProfessorReqDto dto = ProfessorReqDto.of(
                "김영한",
                "데이터베이스",
                "010-1234-5678",
                "younghan@sejong.ac.kr",
                "정교수",
                "https://prof.sejong.ac.kr",
                "충무관 401호"
        );

        // when
        Long savedProfessorId = professorService.saveProfessor(dto, null);

        // then
        Optional<ProfessorTypes> professor = professorRepository.findById(savedProfessorId);
        assertTrue(professor.isPresent());
        assertThat(professor.get())
                .extracting("name", "email")
                .contains("김영한", "younghan@sejong.ac.kr");
    }

    @Test
    @DisplayName("교수 이름 없이 저장 시 예외 발생 테스트")
    void saveProfessorWithoutName() {
        // given
        ProfessorReqDto dto = ProfessorReqDto.of(
                null,
                "데이터베이스",
                "010-1234-5678",
                "younghan@sejong.ac.kr",
                "정교수",
                "https://prof.sejong.ac.kr",
                "충무관 401호"
        );

        // when & then
        ProfessorException exception = assertThrows(ProfessorException.class,
                () -> professorService.saveProfessor(dto, null));

        assertEquals(ProfessorExceptionType.NOT_FOUND_PROFESSOR, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 핸드폰 번호 중복 저장 시 예외 발생 테스트")
    void saveProfessorWithDuplicatePhone() {
        // given
        String duplicatePhone = "010-1234-5678";

        ProfessorReqDto dto1 = ProfessorReqDto.of(
                "김영한",
                "데이터베이스",
                duplicatePhone,
                "younghan@sejong.ac.kr",
                "정교수",
                "https://prof.sejong.ac.kr",
                "충무관 401호"
        );

        ProfessorReqDto dto2 = ProfessorReqDto.of(
                "장영재",
                "알고리즘",
                duplicatePhone,
                "yj@sejong.ac.kr",
                "정교수",
                "https://prof.sejong.ac.kr",
                "충무관 402호"
        );

        // when
        professorService.saveProfessor(dto1, null);

        // then
        ProfessorException exception = assertThrows(ProfessorException.class,
                () -> professorService.saveProfessor(dto2, null));

        assertEquals(ProfessorExceptionType.DUPLICATE_PHONE, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 조회 테스트")
    void getProfessor() {
        // given
        ProfessorReqDto dto = ProfessorReqDto.of(
                "김영한",
                "데이터베이스",
                "010-1234-5678",
                "younghan@sejong.ac.kr",
                "정교수",
                "https://prof.sejong.ac.kr",
                "충무관 401호"
        );

        Long savedProfessorId = professorService.saveProfessor(dto, null);

        // when
        ProfessorResDto professorResDto = professorService.getProfessor(savedProfessorId);

        // then
        assertThat(professorResDto)
                .extracting("id", "name", "phoneN", "email")
                .containsExactly(savedProfessorId, "김영한", "010-1234-5678", "younghan@sejong.ac.kr");
    }

    @Test
    @DisplayName("교수 삭제 테스트 - 존재하는 교수 삭제")
    void deleteProfessor_success() {
        // given
        ProfessorReqDto dto = ProfessorReqDto.of(
                "이영훈",
                "알고리즘",
                "010-5678-1234",
                "lee@sejong.ac.kr",
                "정교수",
                "https://prof.sejong.ac.kr",
                "충무관 403호"
        );

        Long savedProfessorId = professorService.saveProfessor(dto, null);

        // when
        professorService.deleteProfessor(savedProfessorId);

        // then
        assertThat(professorRepository.findById(savedProfessorId)).isEmpty();
    }

    @Test
    @DisplayName("교수 삭제 테스트 - 존재하지 않는 교수 삭제 시 예외 발생")
    void deleteProfessor_notFound() {
        // given
        Long nonExistentProfessorId = 999L;

        // when & then
        ProfessorException exception = assertThrows(ProfessorException.class,
                () -> professorService.deleteProfessor(nonExistentProfessorId));

        assertEquals(ProfessorExceptionType.NOT_FOUND_PROFESSOR, exception.exceptionType());
    }
}
