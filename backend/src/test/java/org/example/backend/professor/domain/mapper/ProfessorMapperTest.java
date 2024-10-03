package org.example.backend.professor.domain.mapper;

import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ProfessorMapperTest {

    @Autowired
    private ProfessorMapper professorMapper;

    @Test
    @DisplayName("ProfessorReqDto를 Professor로 매핑 테스트")
    void toEntity() {
        // given: ProfessorReqDto 객체 생성 및 값 설정
        ProfessorReqDto dto = new ProfessorReqDto();
        dto.setName("홍길동");
        dto.setPhoneN("010-1234-5678");
        dto.setEmail("hong1@example.com");

        // when: DTO를 엔티티로 매핑
        Professor entity = professorMapper.toEntity(dto);

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

        // when: DTO를 엔티티로 매핑
        Professor entity = professorMapper.toEntity(dto);

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

        // when: DTO를 엔티티로 매핑
        professorMapper.updateProfessorFromDto(dto, entity);

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