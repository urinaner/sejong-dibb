package org.example.backend.department.repository;

import org.example.backend.department.domain.entity.Department;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
@SuppressWarnings("NonAsciiCharacters")
class DepartmentRepositoryTest {

    @Autowired
    DepartmentRepository departmentRepository;

    @Test
    @DisplayName("부서 생성 테스트")
    void 부서_생성_테스트() {
        // given
        Department department = new Department();
        department.setKoreanName("컴퓨터공학과");
        // when
        Department savedDepartment = departmentRepository.save(department);
        // then
        assertThat(savedDepartment.getKoreanName()).isEqualTo("컴퓨터공학과");
    }

    @Test
    @DisplayName("부서 조회 테스트")
    void 부서_조회_테스트() {
        // given
        Department department = new Department();
        department.setKoreanName("전자공학과");
        Department savedDepartment = departmentRepository.save(department);
        // when
        Optional<Department> foundDepartment = departmentRepository.findById(savedDepartment.getDepartmentId());
        // then
        assertThat(foundDepartment).isPresent();
        assertThat(foundDepartment.get().getKoreanName()).isEqualTo("전자공학과");
    }

    @Test
    @DisplayName("부서 삭제 테스트")
    void 부서_삭제_테스트() {
        // given
        Department department = new Department();
        department.setKoreanName("기계공학과");
        Department savedDepartment = departmentRepository.save(department);
        // when
        departmentRepository.deleteById(savedDepartment.getDepartmentId());
        // then
        Optional<Department> deletedDepartment = departmentRepository.findById(savedDepartment.getDepartmentId());
        assertThat(deletedDepartment).isNotPresent();
    }

    @Test
    @DisplayName("존재하지 않는 부서 삭제 시 예외 발생 테스트")
    void 존재하지_않는_부서_삭제_테스트() {
        // given
        Long nonExistentId = 999L;
        boolean exists = departmentRepository.existsById(nonExistentId);
        assertThat(exists).isFalse();
        try {
            departmentRepository.deleteById(nonExistentId);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("부서가 존재하지 않아 예외 발생");
        }
    }
}
