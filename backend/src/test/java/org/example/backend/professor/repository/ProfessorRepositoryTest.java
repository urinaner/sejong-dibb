package org.example.backend.professor.repository;

import org.example.backend.IntegrationTestSupport;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.entity.Professor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class ProfessorRepositoryTest extends IntegrationTestSupport {

    @Autowired private ProfessorRepository professorRepository;
    @Autowired private DepartmentRepository departmentRepository;

    private static Department department;

    @BeforeEach
    void setUp() {
        department = new Department();
        department.setKoreanName("컴퓨터공학과" + UUID.randomUUID().toString());  // 유니크한 이름으로 설정
        departmentRepository.save(department);
    }

    @AfterEach
    void tearDown() {
        professorRepository.deleteAll();  // 테스트 데이터 삭제
        departmentRepository.deleteAll();
    }
    @Test
    @DisplayName("휴대폰 번호로 교수 존재 여부 확인")
    void existsByPhoneN() {
        // given
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("홍길동");
        dto.setPhoneN("010-1234-5678"); // 고유한 번호
        dto.setEmail("hong1@example.com"); // 고유한 이메일
        dto.setDepartmentId(department.getDepartmentId());

        // when
        Professor entity = professorMapper.toEntity(dto, departmentRepository);
        Professor savedEntity = professorRepository.save(entity);

        // then
        boolean exists = professorRepository.existsByPhoneN(savedEntity.getPhoneN());
        assertThat(exists).isTrue();
    }

    @Test
    void existsByEmail() {
        // given
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("홍길동");
        dto.setPhoneN("010-1234-5678"); // 고유한 번호
        dto.setEmail("hong1@example.com"); // 고유한 이메일
        dto.setDepartmentId(department.getDepartmentId());

        // when
        Professor entity = professorMapper.toEntity(dto, departmentRepository);
        Professor savedEntity = professorRepository.save(entity);

        // then
        boolean exists = professorRepository.existsByEmail(savedEntity.getEmail());
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("교수 삭제 테스트")
    void deleteProfessorById() {
        // given: 테스트용 교수 데이터 생성 및 저장
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("홍길동");
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("hong1@example.com");
        dto.setDepartmentId(department.getDepartmentId());

        Professor entity = professorMapper.toEntity(dto, departmentRepository);
        Professor savedEntity = professorRepository.save(entity);

        Long professorId = savedEntity.getId();

        // when: 저장된 교수 삭제
        professorRepository.deleteById(professorId);

        // then: 삭제된 교수 정보가 존재하지 않는지 확인
        boolean exists = professorRepository.existsById(professorId);
        assertThat(exists).isFalse();
    }
}