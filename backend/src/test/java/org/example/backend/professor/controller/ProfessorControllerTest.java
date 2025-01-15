package org.example.backend.professor.controller;

import org.example.backend.ControllerTestSupport;
import org.example.backend.professor.domain.dto.ProfessorReqDto;
import org.example.backend.professor.domain.dto.ProfessorResDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProfessorControllerTest extends ControllerTestSupport {

    @Test
    void createProfessor() throws Exception {
        MockMultipartFile professorReqDtoFile = new MockMultipartFile(
                "professorReqDto",
                "",
                "application/json",
                "{ \"name\": \"홍길동\", \"major\": \"컴퓨터공학과\" }".getBytes()
        );

        MockMultipartFile profileImage = new MockMultipartFile(
                "profileImage",
                "profile.jpg",
                "image/jpeg",
                "dummy image content".getBytes()
        );

        given(professorService.saveProfessor(any(ProfessorReqDto.class), any(MultipartFile.class))).willReturn(1L);

        mockMvc.perform(multipart("/api/professor")
                        .file(professorReqDtoFile)
                        .file(profileImage)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

    @Test
    void updateProfessor() throws Exception {
        Long professorId = 1L;

        MockMultipartFile professorReqDtoFile = new MockMultipartFile(
                "professorReqDto",
                "",
                "application/json",
                "{ \"name\": \"김유신\", \"major\": \"화학과\" }".getBytes()
        );

        MockMultipartFile profileImage = new MockMultipartFile(
                "profileImage",
                "updated_profile.jpg",
                "image/jpeg",
                "updated dummy image content".getBytes()
        );

        ProfessorResDto updatedProfessorResDto = ProfessorResDto.builder()
                .id(professorId)
                .name("김유신")
                .major("화학과")
                .build();

        given(professorService.updateProfessor(eq(professorId), any(ProfessorReqDto.class), any(MultipartFile.class)))
                .willReturn(updatedProfessorResDto);

        mockMvc.perform(multipart("/api/professor/{professorId}", professorId)
                        .file(professorReqDtoFile)
                        .file(profileImage)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(professorId))
                .andExpect(jsonPath("$.name").value("김유신"))
                .andExpect(jsonPath("$.major").value("화학과"));
    }
}