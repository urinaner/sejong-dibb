package org.example.backend.professor.service;

import org.example.backend.IntegrationTestSupport;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
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

class ProfessorServiceTest extends IntegrationTestSupport {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ProfessorService professorService;

    @AfterEach
    void init() {
        professorRepository.deleteAllInBatch();
        departmentRepository.deleteAllInBatch();
    }

    @Test
    @DisplayName("교수 저장 테스트")
    void saveProfessor() {
        // given: 테스트용 교수 DTO 준비
        Department department = createDepartment("원자력공학과");
        departmentRepository.save(department);
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("김영한");
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("younghan@sejong.ac.kr");
        dto.setDepartmentId(department.getDepartmentId());

        // when: 교수 저장 메소드 호출
        Long savedProfessorId = professorService.saveProfessor(dto);

        // then: 저장된 교수 정보가 존재하는지 확인
        Optional<Professor> professor = professorRepository.findById(savedProfessorId);
        assertTrue(professor.isPresent());
        assertThat(professor.get())
                .extracting("name", "email")
                .contains("김영한", "younghan@sejong.ac.kr");
    }

    @Test
    @DisplayName("교수 이름 없이 저장 시 예외 발생 테스트")
    void saveProfessorWithoutName() {
        // given: 테스트용 교수 DTO 준비
        Department department = createDepartment("컴퓨터공학과");
        departmentRepository.save(department);
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("younghan@sejong.ac.kr");
        dto.setDepartmentId(department.getDepartmentId());

        // when: 교수 저장 시 이름이 없는 경우 예외 발생 확인
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.saveProfessor(dto));

        // then
        assertEquals(ProfessorExceptionType.REQUIRED_NAME, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 핸드폰 번호 중복 저장 시 예외 발생 테스트")
    void saveProfessorWithDuplicatePhone() {
        // given: 테스트용 교수 DTO 준비
        Department department = createDepartment("전자공학과");
        departmentRepository.save(department);

        ProfessorReqDto dto1 = new ProfessorReqDto();
        dto1.setName("김영한");
        dto1.setPhoneN("010-1234-5678");
        dto1.setEmail("younghan@sejong.ac.kr");
        dto1.setDepartmentId(department.getDepartmentId());

        ProfessorReqDto dto2 = new ProfessorReqDto();
        dto2.setName("장영재");
        dto2.setPhoneN("010-1234-5678"); // 동일한 핸드폰 번호
        dto2.setEmail("yj@sejong.ac.kr");
        dto2.setDepartmentId(department.getDepartmentId());

        // when: 첫 번째 교수 저장
        professorService.saveProfessor(dto1);

        // then: 두 번째 교수 저장 시 예외 발생 확인
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.saveProfessor(dto2));
        assertEquals(ProfessorExceptionType.DUPLICATE_PHONE, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 조회 테스트")
    void getProfessor() {
        // given: 테스트용 교수 저장
        Department department = createDepartment("기계공학과");
        departmentRepository.save(department);

        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("김영한");
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("younghan@sejong.ac.kr");
        dto.setDepartmentId(department.getDepartmentId());

        Long savedProfessorId = professorService.saveProfessor(dto);

        // when: 저장된 교수 ID로 교수 조회
        ProfessorResDto professorResDto = professorService.getProfessor(savedProfessorId);

        // then: 조회된 교수 정보가 null이 아니고, ID가 일치하는지 확인
        assertNotNull(professorResDto);
        assertEquals(savedProfessorId, professorResDto.getId());
        assertEquals("김영한", professorResDto.getName());
        assertEquals("010-1234-5678", professorResDto.getPhoneN());
    }

    private Department createDepartment(String koreanName) {
        Department department = new Department();
        department.setKoreanName(koreanName);
        return department;
    }
}
