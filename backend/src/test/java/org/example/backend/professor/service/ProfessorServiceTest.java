package org.example.backend.professor.service;

import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.exception.ProfessorException;
import org.example.backend.professor.exception.ProfessorExceptionType;
import org.example.backend.professor.repository.ProfessorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class ProfessorServiceTest {

    @Autowired ProfessorService professorService;
    @Autowired ProfessorRepository professorRepository;
    @Autowired DepartmentRepository departmentRepository;

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
        Long savedProfessorId = professorService.saveProfessor(dto);

        // then: 저장된 교수 정보가 존재하는지 확인
        assertTrue(professorRepository.existsById(savedProfessorId));
    }

    @Test
    @DisplayName("교수 이름 없이 저장 시 예외 발생 테스트")
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

        professorService.saveProfessor(dtoSrc);

        ProfessorReqDto dtoDest = new ProfessorReqDto();
        dtoDest.setName("김세종");
        dtoDest.setPhoneN("010-1234-5678");
        dtoDest.setEmail("example@sejong.ac.kr");
        dtoDest.setDepartmentId(1L);

        // when: 교수 저장 시 핸드폰번호 중복인 경우 예외 발생 확인
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.saveProfessor(dtoDest));
        assertEquals(ProfessorExceptionType.DUPLICATE_PHONE, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 이메일 중복 저장 시 예외 발생 테스트")
    void saveProfessorWithDuplicateEmail() {
        // given: 테스트용 교수 DTO 준비
        ProfessorReqDto dtoSrc = new ProfessorReqDto();
        dtoSrc.setName("김영한");
        dtoSrc.setPhoneN("010-1234-5678");
        dtoSrc.setEmail("younghan@sejong.ac.kr");
        dtoSrc.setDepartmentId(1L);

        professorService.saveProfessor(dtoSrc);

        ProfessorReqDto dtoDest = new ProfessorReqDto();
        dtoDest.setName("김세종");
        dtoDest.setPhoneN("010-3445-5678");
        dtoDest.setEmail("younghan@sejong.ac.kr");
        dtoDest.setDepartmentId(1L);

        // when: 교수 저장 시 핸드폰번호 중복인 경우 예외 발생 확인
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.saveProfessor(dtoDest));
        assertEquals(ProfessorExceptionType.DUPLICATE_EMAIL, exception.exceptionType());
    }


    @Test
    @DisplayName("교수 조회 테스트")
    void getProfessor() {
        // given: 먼저 교수를 저장하여 데이터 준비
        ProfessorReqDto professorReqDto = new ProfessorReqDto();
        professorReqDto.setName("김영한");
        professorReqDto.setPhoneN("010-1234-5678");
        professorReqDto.setEmail("younghan@sejong.ac.kr");
        professorReqDto.setDepartmentId(1L); // 가상의 부서 ID

        Long savedProfessorId = professorService.saveProfessor(professorReqDto);

        // when: 저장된 교수 ID로 교수 조회
        ProfessorResDto professorResDto = professorService.getProfessor(savedProfessorId);

        // then: 조회된 교수 정보가 null이 아니고, ID가 일치하는지 확인
        assertNotNull(professorResDto);
        assertEquals(savedProfessorId, professorResDto.getId());
    }

    @Test
    @DisplayName("교수 id 조회 시 없는 교수인 경우 예외 발생 테스트")
    void findProfessorByIdWithNotExistId() {
        // given: 먼저 교수를 저장하여 데이터 준비
        ProfessorReqDto professorReqDto = new ProfessorReqDto();
        professorReqDto.setName("김영한");
        professorReqDto.setPhoneN("010-1234-5678");
        professorReqDto.setEmail("younghan@sejong.ac.kr");
        professorReqDto.setDepartmentId(1L); // 가상의 부서 ID

        Long savedProfessorId = professorService.saveProfessor(professorReqDto);

        // when: 존재하지 않는 교수 ID로 교수 조회 시도
        ProfessorException exception = assertThrows(ProfessorException.class, () -> professorService.getProfessor(savedProfessorId + 1));
        assertEquals(ProfessorExceptionType.NOT_FOUND_PROFESSOR, exception.exceptionType());
    }

    @Test
    @DisplayName("교수 수정 테스트")
    void updateProfessor() {
        // given: 먼저 교수를 저장하여 수정할 교수 데이터 준비
        ProfessorReqDto professorReqDto = new ProfessorReqDto();
        professorReqDto.setName("김영한");
        professorReqDto.setPhoneN("010-1234-5678");
        professorReqDto.setEmail("younghan@sejong.ac.kr");
        professorReqDto.setDepartmentId(1L); // 가상의 부서 ID

        Long savedProfessorId = professorService.saveProfessor(professorReqDto);

        // 수정할 교수 정보 설정
        ProfessorReqDto updatedProfessorReqDto = new ProfessorReqDto();
        updatedProfessorReqDto.setName("김수정");
        updatedProfessorReqDto.setPhoneN("010-8765-4321");
        updatedProfessorReqDto.setEmail("sujeong@sejong.ac.kr");

        // when: 저장된 교수 ID로 교수 수정 메소드 호출
        ProfessorResDto updatedProfessor = professorService.updateProfessor(savedProfessorId, updatedProfessorReqDto);

        // then: 수정된 교수 정보가 제대로 저장되었는지 확인
        assertEquals("김수정", updatedProfessor.getName());
        assertEquals("010-8765-4321", updatedProfessor.getPhoneN());
        assertEquals("sujeong@sejong.ac.kr", updatedProfessor.getEmail());
    }

    @Test
    void deleteProfessor() {
        // given: 먼저 교수를 저장하여 삭제할 교수 데이터 준비
        ProfessorReqDto professorReqDto = new ProfessorReqDto();
        professorReqDto.setName("김영한");
        professorReqDto.setPhoneN("010-1234-5678");
        professorReqDto.setEmail("younghan@sejong.ac.kr");
        professorReqDto.setDepartmentId(1L); // 가상의 부서 ID

        Long savedProfessorId = professorService.saveProfessor(professorReqDto);

        // when: 저장된 교수 ID로 교수 삭제 메소드 호출
        professorService.deleteProfessor(savedProfessorId);

        // then: 삭제된 교수 정보가 존재하지 않는지 확인
        assertFalse(professorRepository.existsById(savedProfessorId));
    }
}