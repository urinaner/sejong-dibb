package org.example.backend.professor.controller;


import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.dto.ResponseDto;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.service.ProfessorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "교수", description = "교수 API")
@RequestMapping("/api/professor")
public class ProfessorController {

    private final ProfessorService professorService;

    @Schema(description = "교수 생성 API", example = "교수 생성")
    @PostMapping
    public ResponseEntity<Long> createProfessor(@RequestBody ProfessorReqDto professorReqDto) {
        Long professorId = professorService.saveProfessor(professorReqDto);
        return new ResponseEntity<>(professorId, HttpStatus.OK);
    }

    @Schema(description = "교수 상세 정보 반환 API", example = "교수 상세 정보 반환")
    @GetMapping("/{professorId}")
    public ResponseEntity<ProfessorResDto> getProfessor(@PathVariable(name = "professorId") Long professorId) {
        ProfessorResDto professorResDto = professorService.getProfessor(professorId);
        return new ResponseEntity<>(professorResDto, HttpStatus.OK);
    }

    @Schema(description = "모든 교수 조회 API", example = "모든 교수의 리스트 반환")
    @GetMapping
    public ResponseDto<List<ProfessorResDto>> getAllBoards(Pageable pageable) {
        Page<ProfessorResDto> professorResDto = professorService.getAllBoards(pageable);
        return ResponseDto.ok(professorResDto.getNumber(), professorResDto.getTotalPages(),
                professorResDto.getContent());
    }

    @Schema(description = "교수 정보 업데이트 API", example = "교수 정보 업데이트")
    @PostMapping("/{professorId}")
    public ResponseEntity<ProfessorResDto> updateProfessor(@PathVariable(name = "professorId") Long professorId,
                                                           @RequestBody ProfessorReqDto professorReqDto) {
        ProfessorResDto professorResDto = professorService.updateProfessor(professorId, professorReqDto);
        return new ResponseEntity<>(professorResDto, HttpStatus.OK);
    }

    @Schema(description = "교수 삭제 API", example = "교수 삭제")
    @DeleteMapping("/{professorId}")
    public ResponseEntity<?> deleteProfessor(@PathVariable(name = "professorId") Long professorId) {
        professorService.deleteProfessor(professorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
