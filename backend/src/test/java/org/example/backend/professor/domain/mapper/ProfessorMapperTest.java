package org.example.backend.professor.domain.mapper;

import jakarta.transaction.Transactional;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class ProfessorMapperTest {

    @Autowired private ProfessorMapper professorMapper;
    @Autowired private DepartmentRepository departmentRepository;

    private static Department department;
    @BeforeEach
    void setUp() {
        department = new Department();
        department.setKoreanName("컴퓨터공학과" + UUID.randomUUID().toString());  // 유니크한 이름으로 변경
        departmentRepository.save(department);
    }

    @AfterEach
    void tearDown() {
        departmentRepository.deleteAll();  // 테스트 후 데이터 삭제
    }

    @Test
    @DisplayName("ProfessorReqDto를 Professor로 매핑 테스트")
    void toEntity() {
        // given: ProfessorReqDto 객체 생성 및 값 설정
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("홍길동");
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("hong1@example.com");
        dto.setDepartmentId(department.getDepartmentId());

        // when: DTO를 엔티티로 매핑
        Professor entity = professorMapper.toEntity(dto, departmentRepository);

        System.out.println(entity.getName());
        System.out.println(entity.getPhoneN());
        System.out.println(entity.getEmail());

        // then: 매핑된 결과 검증
        assertThat(entity).isNotNull();
        assertThat(entity.getName()).isEqualTo(dto.getName());
        assertThat(entity.getPhoneN()).isEqualTo(dto.getPhoneN());
        assertThat(entity.getEmail()).isEqualTo(dto.getEmail());
    }

    @Test
    @DisplayName("nullable = false 필드값이 포함되지 않았을 때 Professor로 매핑 테스트")
    void toEntityWithNullable() {
        // given: ProfessorReqDto 객체 생성 및 값 설정
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("hong1@example.com");
        dto.setDepartmentId(department.getDepartmentId());

        // when: DTO를 엔티티로 매핑
        Professor entity = professorMapper.toEntity(dto, departmentRepository);

        System.out.println(entity.getName());
        System.out.println(entity.getPhoneN());
        System.out.println(entity.getEmail());

        // then: 매핑된 결과 검증
        assertThat(entity).isNotNull();
        assertThat(entity.getPhoneN()).isEqualTo(dto.getPhoneN());
        assertThat(entity.getEmail()).isEqualTo(dto.getEmail());
    }

    @Test
    @DisplayName("Professor를 ProfessorResDto로 매핑 테스트")
    void toProfessorDto() {
        // given: Professor 객체 생성 및 값 설정
        Professor entity = new Professor();
        entity.setName("홍길동");
        entity.setPhoneN("010-1234-5678");
        entity.setEmail("hong1@example.com");

        // when: 엔티티를 DTO로 매핑
        ProfessorResDto dto = professorMapper.toProfessorDto(entity);

        System.out.println(dto.getName());
        System.out.println(dto.getPhoneN());
        System.out.println(dto.getEmail());

        // then: 매핑된 결과 검증
        assertThat(dto).isNotNull();
        assertThat(dto.getName()).isEqualTo(entity.getName());
        assertThat(dto.getPhoneN()).isEqualTo(entity.getPhoneN());
        assertThat(dto.getEmail()).isEqualTo(entity.getEmail());
    }

    @Test
    @DisplayName("부분 ProfessorReqDto를 Professor로 update 테스트")
    void updateProfessorFromDto() {
        // given: ProfessorReqDto 객체 생성 및 값 설정

        String name = "김나무";
        String changePhoneN = "010-1234-5678";
        String changeEmail = "hong1@example.com";

        Professor entity = new Professor();
        entity.setName(name);
        entity.setPhoneN("010-3456-7891");
        entity.setEmail("hong1@example.com");

        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setPhoneN(changePhoneN);
        dto.setEmail(changeEmail);
        dto.setDepartmentId(1L);

        // when: DTO를 엔티티로 매핑
        professorMapper.updateProfessorFromDto(dto, entity, departmentRepository);

        System.out.println(entity.getName());
        System.out.println(entity.getPhoneN());
        System.out.println(entity.getEmail());

        // then: 매핑된 결과 검증
        assertThat(entity).isNotNull();
        assertThat(entity.getName()).isEqualTo(name);
        assertThat(entity.getPhoneN()).isEqualTo(changePhoneN);
        assertThat(entity.getEmail()).isEqualTo(changeEmail);
    }

}