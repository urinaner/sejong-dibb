package org.example.backend.professor.repository;

import org.example.backend.IntegrationTestSupport;
import org.example.backend.professor.domain.entity.ProfessorTypes;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class ProfessorRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ProfessorRepository professorRepository;

    @AfterEach
    void tearDown() {
        professorRepository.deleteAll();
    }

    @Test
    @DisplayName("휴대폰 번호로 교수 존재 여부 확인")
    void existsByPhoneN() {
        // given
        ProfessorTypes professor = ProfessorTypes.builder()
                .name("홍길동")
                .major("컴퓨터공학")
                .phoneN("010-1234-5678")
                .email("hong1@example.com")
                .position("정교수")
                .homepage("https://prof.sejong.ac.kr")
                .lab("충무관 404호")
                .profileImage("profile.jpg")
                .build();

        ProfessorTypes savedProfessor = professorRepository.save(professor);

        // when
        boolean exists = professorRepository.existsByPhoneN(savedProfessor.getPhoneN());

        // then
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("이메일로 교수 존재 여부 확인")
    void existsByEmail() {
        // given
        ProfessorTypes professor = ProfessorTypes.builder()
                .name("홍길동")
                .major("컴퓨터공학")
                .phoneN("010-1234-5678")
                .email("hong1@example.com")
                .position("정교수")
                .homepage("https://prof.sejong.ac.kr")
                .lab("충무관 404호")
                .profileImage("profile.jpg")
                .build();

        ProfessorTypes savedProfessor = professorRepository.save(professor);

        // when
        boolean exists = professorRepository.existsByEmail(savedProfessor.getEmail());

        // then
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("교수 삭제 테스트")
    void deleteProfessorById() {
        // given
        ProfessorTypes professor = ProfessorTypes.builder()
                .name("홍길동")
                .major("컴퓨터공학")
                .phoneN("010-1234-5678")
                .email("hong1@example.com")
                .position("정교수")
                .homepage("https://prof.sejong.ac.kr")
                .lab("충무관 404호")
                .profileImage("profile.jpg")
                .build();

        ProfessorTypes savedProfessor = professorRepository.save(professor);
        Long professorId = savedProfessor.getId();

        // when
        professorRepository.deleteById(professorId);

        // then
        assertThat(professorRepository.existsById(professorId)).isFalse();
    }
}
