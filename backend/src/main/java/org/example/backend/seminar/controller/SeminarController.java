package org.example.backend.seminar.controller;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.seminar.domain.dto.SeminarReqDto;
import org.example.backend.seminar.domain.dto.SeminarResDto;
import org.example.backend.seminar.service.SeminarService;
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
@Tag(name = "세미나", description = "세미나 API")
@RequestMapping("/api/seminar")
public class SeminarController {
    private final SeminarService seminarService;

    @Schema(description = "세미나 생성 API", example = "세미나 생성")
    @PostMapping
    public ResponseEntity<Long> createSeminar(@RequestBody SeminarReqDto seminarReqDto) {
        Long seminarId = seminarService.saveSeminar(seminarReqDto);
        return new ResponseEntity<>(seminarId, HttpStatus.OK);
    }

    @Schema(description = "세미나 상세 정보 반환 API", example = "세미나 상세 정보 반환")
    @GetMapping("/{seminarId}")
    public ResponseEntity<SeminarResDto> getSeminar(@PathVariable(name = "seminarId") Long seminarId) {
        SeminarResDto seminarResDto = seminarService.getSeminar(seminarId);
        return new ResponseEntity<>(seminarResDto, HttpStatus.OK);
    }

    @Schema(description = "세미나 정보 업데이트 API", example = "세미나 정보 업데이트")
    @PostMapping("/{seminarId}")
    public ResponseEntity<SeminarResDto> updateSeminar(@PathVariable(name = "seminarId") Long seminarId,
                                                       @RequestBody SeminarReqDto seminarReqDto) {
        SeminarResDto seminarResDto = seminarService.updateSeminar(seminarId, seminarReqDto);
        return new ResponseEntity<>(seminarResDto, HttpStatus.OK);
    }

    @Schema(description = "세미나 삭제 API", example = "세미나 삭제")
    @DeleteMapping("/{seminarId}")
    public ResponseEntity<?> deleteSeminar(@PathVariable(name = "seminarId") Long seminarId) {
        seminarService.deleteSeminar(seminarId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
