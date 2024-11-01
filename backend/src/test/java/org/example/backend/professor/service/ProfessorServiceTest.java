package org.example.backend.professor.service;

import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.exception.ProfessorException;
import org.example.backend.professor.exception.ProfessorExceptionType;
import org.example.backend.professor.repository.ProfessorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class ProfessorServiceTest {

    @MockBean
    private ProfessorRepository professorRepository;

    @Autowired
    private ProfessorService professorService;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("교수 저장 테스트")
    void saveProfessor() {
        // given: 테스트용 교수 DTO 준비
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("김영한");
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("younghan@sejong.ac.kr");
        dto.setDepartmentId(1L);

        // when: 교수 저장 메소드 호출
        when(professorRepository.save(any())).thenReturn(mockSavedProfessor());
        Long savedProfessorId = professorService.saveProfessor(dto);

        // then: 저장된 교수 정보가 존재하는지 확인
        assertNotNull(savedProfessorId);
        verify(professorRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("교수 이름 없이 저장 시 예외 발생 테스트 (Mock 사용)")
    void saveProfessorWithoutName() {
        // given: 테스트용 교수 DTO 준비
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("younghan@sejong.ac.kr");
        dto.setDepartmentId(1L);

        // when: 교수 저장 시 이름이 없는 경우 예외 발생 확인
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.saveProfessor(dto));
        assertEquals(ProfessorExceptionType.REQUIRED_NAME, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 핸드폰 번호 중복 저장 시 예외 발생 테스트")
    void saveProfessorWithDuplicatePhone() {
        // given: 테스트용 교수 DTO 준비
        ProfessorReqDto dtoSrc = new ProfessorReqDto();
        dtoSrc.setName("김영한");
        dtoSrc.setPhoneN("010-1234-5678");
        dtoSrc.setEmail("younghan@sejong.ac.kr");
        dtoSrc.setDepartmentId(1L);

        when(professorRepository.existsByPhoneN(dtoSrc.getPhoneN())).thenReturn(true);

        // when: 교수 저장 시 핸드폰번호 중복인 경우 예외 발생 확인
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.saveProfessor(dtoSrc));
        assertEquals(ProfessorExceptionType.DUPLICATE_PHONE, exception.exceptionType());

        verify(professorRepository, times(1)).existsByPhoneN(any());
    }

    @Test
    @DisplayName("교수 조회 테스트")
    void getProfessor() {
        // given: 교수 ID로 조회할 때 반환될 교수 객체 Mocking
        Long professorId = 1L;
        when(professorRepository.findById(professorId)).thenReturn(java.util.Optional.of(mockSavedProfessor()));

        // when: 저장된 교수 ID로 교수 조회
        ProfessorResDto professorResDto = professorService.getProfessor(professorId);

        // then: 조회된 교수 정보가 null이 아니고, ID가 일치하는지 확인
        assertNotNull(professorResDto);
        assertEquals(professorId, professorResDto.getId());
    }

    // Mock으로 사용될 저장된 교수 객체를 반환하는 메서드
    private Professor mockSavedProfessor() {
        Professor professor = new Professor();
        professor.setId(1L);
        professor.setName("김영한");
        professor.setPhoneN("010-1234-5678");
        professor.setEmail("younghan@sejong.ac.kr");
        return professor;
    }
}