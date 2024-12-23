package org.example.backend.seminar.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.dto.PageRequestDto;
import org.example.backend.common.dto.ResponseDto;
import org.example.backend.seminar.domain.dto.SeminarReqDto;
import org.example.backend.seminar.domain.dto.SeminarResDto;
import org.example.backend.seminar.service.SeminarService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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

    @Operation(summary = "세미나 생성 API", description = "세미나 생성")
    @PostMapping
    public ResponseEntity<Long> createSeminar(@RequestBody SeminarReqDto seminarReqDto) {
        Long seminarId = seminarService.saveSeminar(seminarReqDto);
        return new ResponseEntity<>(seminarId, HttpStatus.OK);
    }

    @Operation(summary = "모든 세미나 조회 API", description = "모든 세미나의 리스트 반환")
    @GetMapping
    public ResponseDto<List<SeminarResDto>> getAllBoards(@Valid @ModelAttribute PageRequestDto pageRequest) {

        Page<SeminarResDto> seminarList = seminarService.getAllSeminars(pageRequest.toPageable());
        return ResponseDto.ok(seminarList.getNumber(), seminarList.getTotalPages(), seminarList.getContent());
    }

    @Operation(summary = "단일 세미나 조회 API", description = "단일 세미나의 리스트 반환")
    @GetMapping("/{seminarId}")
    public ResponseEntity<SeminarResDto> getSeminar(@PathVariable(name = "seminarId") Long seminarId) {
        SeminarResDto seminarResDto = seminarService.getSeminar(seminarId);
        return new ResponseEntity<>(seminarResDto, HttpStatus.OK);
    }

    @Operation(summary = "세미나 정보 업데이트 API", description = "세미나 정보 업데이트")
    @PostMapping("/{seminarId}")
    public ResponseEntity<SeminarResDto> updateSeminar(@PathVariable(name = "seminarId") Long seminarId,
                                                       @RequestBody SeminarReqDto seminarReqDto) {
        SeminarResDto seminarResDto = seminarService.updateSeminar(seminarId, seminarReqDto);
        return new ResponseEntity<>(seminarResDto, HttpStatus.OK);
    }

    @Operation(summary = "세미나 삭제 API", description = "세미나 삭제")
    @DeleteMapping("/{seminarId}")
    public ResponseEntity<?> deleteSeminar(@PathVariable(name = "seminarId") Long seminarId) {
        seminarService.deleteSeminar(seminarId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
