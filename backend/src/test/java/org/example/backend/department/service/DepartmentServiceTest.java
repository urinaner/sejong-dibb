package org.example.backend.department.service;

import org.example.backend.IntegrationTestSupport;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.repository.DepartmentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class DepartmentServiceTest extends IntegrationTestSupport {

    @Autowired
    DepartmentService departmentService;
    @Autowired
    DepartmentRepository departmentRepository;

    @AfterEach
    void tearDown() {
        departmentRepository.deleteAllInBatch();
    }

    @DisplayName("부서 등록 테스트")
    @Test
    void registerDepartment() {
        // given
        DepartmentReqDto departmentReqDto = DepartmentReqDto.builder()
                .koreanName("컴퓨터공학과")
                .build();
        // when
        Long saveId = departmentService.saveDepartment(departmentReqDto);

        // then
        DepartmentResDto department = departmentService.getDepartment(saveId);
        assertThat(departmentReqDto.getKoreanName()).isEqualTo(department.getKoreanName());
    }

    @DisplayName("부서 상세 조회 테스트")
    @Test
    void getDepartment() {
        // given
        DepartmentReqDto departmentReqDto = DepartmentReqDto.builder()
                .koreanName("컴퓨터공학과")
                .build();
        Long saveId = departmentService.saveDepartment(departmentReqDto);

        // when
        DepartmentResDto departmentResDto = departmentService.getDepartment(saveId);

        // then
        assertThat(departmentResDto.getKoreanName()).isEqualTo("컴퓨터공학과");
    }

    @DisplayName("부서 업데이트 테스트")
    @Test
    void updateDepartment() {
        // given
        DepartmentReqDto departmentReqDto = DepartmentReqDto.builder()
                .koreanName("컴퓨터공학과")
                .build();
        Long saveId = departmentService.saveDepartment(departmentReqDto);

        // when
        DepartmentReqDto updatedDepartmentReqDto = DepartmentReqDto.builder()
                .koreanName("전자공학과")
                .build();
        departmentService.updateDepartment(saveId, updatedDepartmentReqDto);
        DepartmentResDto updatedDepartment = departmentService.getDepartment(saveId);

        // then
        assertThat(updatedDepartment.getKoreanName()).isEqualTo("전자공학과");
    }

    @DisplayName("부서 삭제 테스트")
    @Test
    void deleteDepartment() {
        // given
        DepartmentReqDto departmentReqDto = DepartmentReqDto.builder()
                .koreanName("컴퓨터공학과")
                .build();
        Long saveId = departmentService.saveDepartment(departmentReqDto);

        // when
        departmentService.deleteDepartment(saveId);

        // then
        assertThat(departmentRepository.existsByKoreanName("컴퓨터공학과")).isFalse();
    }
}
