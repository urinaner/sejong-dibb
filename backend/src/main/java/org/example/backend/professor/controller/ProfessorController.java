package org.example.backend.professor.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.dto.PageRequestDto;
import org.example.backend.common.dto.ResponseDto;
import org.example.backend.professor.domain.dto.ProfessorReqDto;
import org.example.backend.professor.domain.dto.ProfessorResDto;
import org.example.backend.professor.service.ProfessorService;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Tag(name = "교수", description = "교수 API")
@RequestMapping("/api/professor")
public class ProfessorController {

    private final ProfessorService professorService;

    @Operation(summary = "교수 생성 API", description = "교수 생성")
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Long> createProfessor(
            @RequestPart(value = "professorReqDto") @Valid ProfessorReqDto professorReqDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile multipartFile
    ) {
        Long professorId = professorService.saveProfessor(professorReqDto, multipartFile);
        return new ResponseEntity<>(professorId, HttpStatus.OK);
    }

    @Operation(summary = "교수 상세 정보 반환 API", description = "교수 상세 정보 반환")
    @GetMapping("/{professorId}")
    public ResponseEntity<ProfessorResDto> getProfessor(@PathVariable(name = "professorId") Long professorId) {
        ProfessorResDto professorResDto = professorService.getProfessor(professorId);
        return new ResponseEntity<>(professorResDto, HttpStatus.OK);
    }

    @Operation(summary = "교수별 논문 조회 API", description = "교수별 논문의 리스트 반환")
    @GetMapping("/{professorId}/thesis")
    public ResponseDto<List<ThesisResDto>> getThesisByProfessor(
            @PathVariable(name = "professorId") Long professorId,
            @Valid @ModelAttribute PageRequestDto pageRequest) {

        Page<ThesisResDto> thesisResDtos = professorService.getThesisByProfessor(
                professorId,
                pageRequest.toPageable()
        );
        return ResponseDto.ok(thesisResDtos.getNumber(), thesisResDtos.getTotalPages(), thesisResDtos.getContent());
    }

    @Operation(summary = "모든 교수 조회 API", description = "모든 교수의 리스트 반환")
    @GetMapping
    public ResponseDto<List<ProfessorResDto>> getAllProfessors(@Valid @ModelAttribute PageRequestDto pageRequest) {
        Page<ProfessorResDto> professorResDto = professorService.getAllProfessors(pageRequest.toPageable());
        return ResponseDto.ok(professorResDto.getNumber(), professorResDto.getTotalPages(),
                professorResDto.getContent());
    }

    @Operation(summary = "교수 정보 업데이트 API", description = "교수 정보 업데이트")
    @PostMapping("/{professorId}")
    public ResponseEntity<ProfessorResDto> updateProfessor(@PathVariable(name = "professorId") Long professorId,
                                                           @RequestPart(value = "professorReqDto") ProfessorReqDto professorReqDto,
                                                           @RequestPart(value = "profileImage", required = false) MultipartFile multipartFile) {
        ProfessorResDto professorResDto = professorService.updateProfessor(professorId, professorReqDto, multipartFile);
        return new ResponseEntity<>(professorResDto, HttpStatus.OK);
    }

    @Operation(summary = "교수 삭제 API", description = "교수 삭제")
    @DeleteMapping("/{professorId}")
    public ResponseEntity<?> deleteProfessor(@PathVariable(name = "professorId") Long professorId) {
        professorService.deleteProfessor(professorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
