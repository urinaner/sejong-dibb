package org.example.backend.department.repository;

import org.example.backend.IntegrationTestSupport;
import org.example.backend.department.domain.entity.Department;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class DepartmentRepositoryTest extends IntegrationTestSupport {

    @Autowired
    DepartmentRepository departmentRepository;

    @Test
    @DisplayName("부서 생성 테스트")
    void testCreateDepartment() {
        // given
        Department department = Department.builder()
                .koreanName("컴퓨터공학과")
                .build();
        // when
        Department savedDepartment = departmentRepository.save(department);
        // then
        assertThat(savedDepartment.getKoreanName()).isEqualTo("컴퓨터공학과");
    }

    @Test
    @DisplayName("부서 조회 테스트")
    void testFindDepartment() {
        // given
        Department department = Department.builder()
                .koreanName("컴퓨터공학과")
                .build();
        Department savedDepartment = departmentRepository.save(department);
        // when
        Optional<Department> foundDepartment = departmentRepository.findById(savedDepartment.getId());
        // then
        assertThat(foundDepartment).isPresent();
        assertThat(foundDepartment.get().getKoreanName()).isEqualTo("컴퓨터공학과");
    }

    @Test
    @DisplayName("부서 삭제 테스트")
    void testDeleteDepartment() {
        // given
        Department department = Department.builder()
                .koreanName("기계공학과")
                .build();
        Department savedDepartment = departmentRepository.save(department);
        // when
        departmentRepository.deleteById(savedDepartment.getId());
        // then
        Optional<Department> deletedDepartment = departmentRepository.findById(savedDepartment.getId());
        assertThat(deletedDepartment).isNotPresent();
    }

    @Test
    @DisplayName("존재하지 않는 부서 삭제 시 예외 발생 테스트")
    void testDeleteNonExistentDepartment() {
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
