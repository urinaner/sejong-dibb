package org.example.backend.professor.repository;

import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.domain.mapper.ProfessorMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ProfessorRepositoryTest {

    @Autowired private ProfessorMapper professorMapper;

    @Autowired private ProfessorRepository professorRepository;

    @Autowired private DepartmentRepository departmentRepository;

    @Test
    @DisplayName("휴대폰 번호로 교수 존재 여부 확인")
    void existsByPhoneN() {
        // given
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("홍길동");
        dto.setPhoneN("010-1234-5678"); // 고유한 번호
        dto.setEmail("hong1@example.com"); // 고유한 이메일

        // 필요한 경우: department 설정이 필요하지 않으면 생략 가능
        // dto.setDepartment(null);

        Professor entity = professorMapper.toEntity(dto, departmentRepository);

        // when
        Professor savedEntity = professorRepository.save(entity);

        // then
        boolean exists = professorRepository.existsByPhoneN(savedEntity.getPhoneN());
        assertThat(exists).isTrue();
    }

    @Test
    void existsByEmail() {
        // 추가 테스트 로직
    }
}