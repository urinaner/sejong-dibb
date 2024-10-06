package org.example.backend.professor.controller;


import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.service.ProfessorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "교수", description = "교수 API")
@RequestMapping("/api/professor")
public class ProfessorController {

    private final ProfessorService professorService;

    @ApiOperation(value = "교수 생성 API", notes = "교수 생성")
    @PostMapping
    public ResponseEntity<Long> createProfessor(@RequestBody ProfessorReqDto professorReqDto) {
        Long professorId = professorService.saveProfessor(professorReqDto);
        return new ResponseEntity<>(professorId, HttpStatus.OK);
    }

    @ApiOperation(value = "교수 상세 정보 반환 API", notes = "교수 상세 정보 반환")
    @GetMapping("/{professorId}")
    public ResponseEntity<ProfessorResDto> getProfessor(@PathVariable(name = "professorId") Long professorId) {
        ProfessorResDto professorResDto = professorService.getProfessor(professorId);
        return new ResponseEntity<>(professorResDto, HttpStatus.OK);
    }

    @ApiOperation(value = "교수 정보 업데이트 API", notes = "교수 정보 업데이트")
    @PostMapping("/{professorId}")
    public ResponseEntity<ProfessorResDto> updateProfessor(@PathVariable(name = "professorId") Long professorId, @RequestBody ProfessorReqDto professorReqDto) {
        ProfessorResDto professorResDto = professorService.updateProfessor(professorId, professorReqDto);
        return new ResponseEntity<>(professorResDto, HttpStatus.OK);
    }

    @ApiOperation(value = "교수 삭제 API", notes = "교수 삭제")
    @DeleteMapping("/{professorId}")
    public ResponseEntity<?> deleteProfessor(@PathVariable(name = "professorId") Long professorId) {
        professorService.deleteProfessor(professorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
