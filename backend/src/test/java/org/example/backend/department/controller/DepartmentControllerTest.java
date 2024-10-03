package org.example.backend.department.controller;

import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.service.DepartmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@SuppressWarnings("NonAsciiCharacters")
class DepartmentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DepartmentService departmentService;

    @Test
    @WithMockUser(roles = "ADMIN")
    void 부서_상세_조회() throws Exception {
        // Given
        DepartmentReqDto departmentReqDto = new DepartmentReqDto();
        departmentReqDto.setKoreanName("컴퓨터공학과");
        // 부서 저장
        Long departmentId = departmentService.saveDepartment(departmentReqDto);
        // 부서 정보를 Mocking
        DepartmentResDto resDto = new DepartmentResDto();
        resDto.setKoreanName("컴퓨터공학과");

        // Mocking
        when(departmentService.getDepartment(departmentId)).thenReturn(resDto);

        // When & Then
        mockMvc.perform(get("/api/departments/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.koreanName").value("컴퓨터공학과"));
    }

    @Test
    void createDepartment() {
    }

    @Test
    void updateDepartment() {
    }

    @Test
    void deleteDepartment() {
    }
}