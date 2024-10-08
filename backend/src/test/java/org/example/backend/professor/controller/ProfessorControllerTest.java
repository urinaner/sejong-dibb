package org.example.backend.professor.controller;

import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.service.ProfessorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProfessorController.class)
@AutoConfigureMockMvc(addFilters = false)
class ProfessorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfessorService professorService;

    @Test
    void createProfessor() throws Exception {
        String professorJson = "{ \"name\": \"홍길동\", \"major\": \"컴퓨터공학과\" }";

        // ProfessorService의 동작 Mock 설정
        given(professorService.saveProfessor(any(ProfessorReqDto.class))).willReturn(1L);

        mockMvc.perform(post("/api/professor")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(professorJson))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

    @Test
    void getProfessor() throws Exception {
        Long professorId = 1L;

        // ProfessorService의 동작 Mock 설정
        ProfessorResDto professorResDto = new ProfessorResDto();
        professorResDto.setId(professorId);
        professorResDto.setName("이순신");
        professorResDto.setMajor("수학과");

        given(professorService.getProfessor(professorId)).willReturn(professorResDto);

        mockMvc.perform(get("/api/professor/{professorId}", professorId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(professorId))
                .andExpect(jsonPath("$.name").value("이순신"))
                .andExpect(jsonPath("$.major").value("수학과"));
    }

    @Test
    void updateProfessor() throws Exception {
        Long professorId = 1L;

        String professorJson = "{ \"name\": \"김유신\", \"major\": \"화학과\" }";

        // 업데이트 후 반환될 교수 정보 설정
        ProfessorResDto updatedProfessorResDto = new ProfessorResDto();
        updatedProfessorResDto.setId(professorId);
        updatedProfessorResDto.setName("김유신");
        updatedProfessorResDto.setMajor("화학과");

        // ProfessorService의 동작 Mock 설정
        given(professorService.updateProfessor(eq(professorId), any(ProfessorReqDto.class))).willReturn(updatedProfessorResDto);

        // 요청 수행 및 검증
        mockMvc.perform(post("/api/professor/{professorId}", professorId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(professorJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(professorId))
                .andExpect(jsonPath("$.name").value("김유신"))
                .andExpect(jsonPath("$.major").value("화학과"));
    }

    @Test
    void deleteProfessor() throws Exception {
        Long professorId = 1L;

        // ProfessorService의 동작 Mock 설정
        willDoNothing().given(professorService).deleteProfessor(professorId);

        // 요청 수행 및 검증
        mockMvc.perform(delete("/api/professor/{professorId}", professorId))
                .andExpect(status().isOk());
    }
}