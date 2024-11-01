package org.example.backend.department.controller;

import org.example.backend.ControllerTestSupport;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class DepartmentControllerTest extends ControllerTestSupport {

    @Test
    @DisplayName("부서 상세 조회")
    void getDepartmentDetails() throws Exception {
        // Given
        DepartmentResDto resDto = new DepartmentResDto();
        resDto.setKoreanName("컴퓨터공학과");
        Long departmentId = 1L;

        // Mocking
        when(departmentService.getDepartment(departmentId)).thenReturn(resDto);

        // When & Then
        mockMvc.perform(get("/api/departments/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.koreanName").value("컴퓨터공학과"));
    }

    @Test
    @DisplayName("부서 생성")
    void createDepartment() throws Exception {
        // Given
        DepartmentReqDto reqDto = new DepartmentReqDto();
        reqDto.setKoreanName("컴퓨터공학과");

        Long createdId = 1L;

        // Mocking
        when(departmentService.saveDepartment(reqDto)).thenReturn(createdId);

        // When & Then
        mockMvc.perform(post("/api/departments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reqDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").value(createdId));
    }

    @Test
    @DisplayName("부서 수정")
    void updateDepartment() throws Exception {
        // Given
        DepartmentReqDto reqDto = new DepartmentReqDto();
        reqDto.setKoreanName("수정된 컴퓨터공학과");

        DepartmentResDto resDto = new DepartmentResDto();
        resDto.setKoreanName("수정된 컴퓨터공학과");

        Long departmentId = 1L;

        // Mocking
        when(departmentService.updateDepartment(departmentId, reqDto)).thenReturn(resDto);

        // When & Then
        mockMvc.perform(put("/api/departments/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reqDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.koreanName").value("수정된 컴퓨터공학과"));
    }

    @Test
    @DisplayName("부서 삭제")
    void deleteDepartment() throws Exception {
        // Given
        Long departmentId = 1L;

        // Mocking
        doNothing().when(departmentService).deleteDepartment(departmentId);

        // When & Then
        mockMvc.perform(delete("/api/departments/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
