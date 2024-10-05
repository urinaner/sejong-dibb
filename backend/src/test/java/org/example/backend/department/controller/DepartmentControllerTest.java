package org.example.backend.department.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    @Autowired
    private ObjectMapper objectMapper; // JSON 직렬화를 위한 ObjectMapper

    @Test
    @WithMockUser(roles = "ADMIN")
    void 부서_상세_조회() throws Exception {
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
    @WithMockUser(roles = "ADMIN")
    void 부서_생성() throws Exception {
        // Given
        DepartmentReqDto reqDto = new DepartmentReqDto();
        reqDto.setKoreanName("컴퓨터공학과");

        Long createdId = 1L;

        // Mocking
        when(departmentService.saveDepartment(reqDto)).thenReturn(createdId);

        // When & Then
        mockMvc.perform(post("/api/departments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reqDto))) // JSON 변환
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").value(createdId));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void 부서_수정() throws Exception {
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
                        .content(objectMapper.writeValueAsString(reqDto))) // JSON 변환
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.koreanName").value("수정된 컴퓨터공학과"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void 부서_삭제() throws Exception {
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
