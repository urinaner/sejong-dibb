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
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class DepartmentControllerTest extends ControllerTestSupport {

    @Test
    @DisplayName("부서 상세 조회")
    void getDepartmentDetails() throws Exception {
        // Given
        DepartmentResDto resDto = DepartmentResDto.builder()
                .koreanName("컴퓨터공학과")
                .build();
        Long departmentId = 1L;

        // Mocking
        when(departmentService.getDepartment(departmentId)).thenReturn(resDto);

        // When & Then
        mockMvc.perform(get("/api/department/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.koreanName").value("컴퓨터공학과"));
    }

    @Test
    @DisplayName("부서 생성")
    void createDepartment() throws Exception {
        // Given
        DepartmentReqDto reqDto = DepartmentReqDto.builder()
                .koreanName("컴퓨터공학과")
                .build();

        Long createdId = 1L;

        // Mocking
        when(departmentService.saveDepartment(reqDto)).thenReturn(createdId);

        // When & Then
        mockMvc.perform(post("/api/department")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reqDto)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("부서 수정")
    void updateDepartment() throws Exception {
        // Given
        DepartmentReqDto reqDto = DepartmentReqDto.builder()
                .koreanName("컴퓨터공학과")
                .build();

        DepartmentResDto resDto = DepartmentResDto.builder()
                .koreanName("수정된 컴퓨터공학과")
                .build();

        Long departmentId = 1L;

        // Mocking
        when(departmentService.updateDepartment(departmentId, reqDto)).thenReturn(resDto);

        // When & Then
        mockMvc.perform(put("/api/department/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reqDto)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @DisplayName("부서 삭제")
    void deleteDepartment() throws Exception {
        // Given
        Long departmentId = 1L;

        // Mocking
        doNothing().when(departmentService).deleteDepartment(departmentId);

        // When & Then
        mockMvc.perform(delete("/api/department/" + departmentId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
