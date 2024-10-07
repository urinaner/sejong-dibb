package org.example.backend.department.service;

import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.mapper.DepartmentMapper;
import org.example.backend.department.repository.DepartmentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@SuppressWarnings("NonAsciiCharacters")
class DepartmentServiceTest {

    @Autowired
    DepartmentService departmentService;
    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    DepartmentMapper departmentMapper;

    @Test
    void 부서_등록() {
        //given
        DepartmentReqDto departmentReqDto = new DepartmentReqDto();
        departmentReqDto.setKoreanName("컴퓨터공학과");
        //when
        Long saveId = departmentService.saveDepartment(departmentReqDto);
        //then
        DepartmentResDto department = departmentService.getDepartment(saveId);
        assertThat(departmentReqDto.getKoreanName()).isEqualTo(department.getKoreanName());
    }

    @Test
    void 부서_가져오기() {
        // given
        DepartmentReqDto departmentReqDto = new DepartmentReqDto();
        departmentReqDto.setKoreanName("컴퓨터공학과");
        Long saveId = departmentService.saveDepartment(departmentReqDto);
        // when
        DepartmentResDto departmentResDto = departmentService.getDepartment(saveId);
        // then
        assertThat(departmentResDto.getKoreanName()).isEqualTo("컴퓨터공학과");
    }

    @Test
    void 부서_업데이트() {
        // given
        DepartmentReqDto departmentReqDto = new DepartmentReqDto();
        departmentReqDto.setKoreanName("컴퓨터공학과");
        Long saveId = departmentService.saveDepartment(departmentReqDto);
        // when
        DepartmentReqDto updatedDepartmentReqDto = new DepartmentReqDto();
        updatedDepartmentReqDto.setKoreanName("전자공학과");
        departmentService.updateDepartment(saveId, updatedDepartmentReqDto);
        DepartmentResDto updatedDepartment = departmentService.getDepartment(saveId);
        // then
        assertThat(updatedDepartment.getKoreanName()).isEqualTo("전자공학과");
    }

    @Test
    void 부서_삭제() {
        // given
        DepartmentReqDto departmentReqDto = new DepartmentReqDto();
        departmentReqDto.setKoreanName("컴퓨터공학과");
        Long saveId = departmentService.saveDepartment(departmentReqDto);
        // when
        departmentService.deleteDepartment(saveId);
        // then
        assertThatThrownBy(() -> departmentService.getDepartment(saveId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("부서 정보가 존재하지 않습니다.");
    }
}