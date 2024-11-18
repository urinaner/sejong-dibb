package org.example.backend.professor.controller;

import org.example.backend.ControllerTestSupport;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProfessorControllerTest extends ControllerTestSupport {

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

        ProfessorResDto professorResDto = ProfessorResDto.builder()
                .id(professorId)
                .name("이순신")
                .major("수학과")
                .build();

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
        ProfessorResDto updatedProfessorResDto = ProfessorResDto.builder()
                .id(professorId)
                .name("김유신")
                .major("화학과")
                .build();

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