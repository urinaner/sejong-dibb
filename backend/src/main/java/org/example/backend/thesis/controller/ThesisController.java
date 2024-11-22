package org.example.backend.thesis.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.dto.ResponseDto;
import org.example.backend.thesis.domain.dto.ThesisReqDto;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.service.ThesisService;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Tag(name = "논문", description = "논문 API")
@RequestMapping("/api/thesis")
public class ThesisController {

    private final ThesisService thesisService;

    @Operation(summary = "논문 생성 API", description = "논문 생성")
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Long> createThesis(
            @RequestPart(value = "thesisReqDto") ThesisReqDto thesisReqDto,
            @RequestPart(value = "thesis_image") MultipartFile multipartFile) {
        Long thesisId = thesisService.saveThesis(thesisReqDto, multipartFile);
        return new ResponseEntity<>(thesisId, HttpStatus.OK);
    }

    @Operation(summary = "논문 상세 정보 반환 API", description = "논문 상세 정보 반환")
    @GetMapping("/{thesisId}")
    public ResponseEntity<ThesisResDto> getThesis(@PathVariable(name = "thesisId") Long thesisId) {
        ThesisResDto thesisResDto = thesisService.getThesis(thesisId);
        return new ResponseEntity<>(thesisResDto, HttpStatus.OK);
    }

    @Operation(summary = "모든 논문 조회 API", description = "모든 논문의 리스트 반환")
    @GetMapping
    public ResponseDto<List<ThesisResDto>> getAllBoards(Pageable pageable) {
        Page<ThesisResDto> thesisResDtos = thesisService.getAllTheses(pageable);
        return ResponseDto.ok(thesisResDtos.getNumber(), thesisResDtos.getTotalPages(), thesisResDtos.getContent());
    }

    @Operation(summary = "논문 정보 업데이트 API", description = "논문 정보 업데이트")
    @PostMapping("/{thesisId}")
    public ResponseEntity<ThesisResDto> updateThesis(@PathVariable(name = "thesisId") Long thesisId,
                                                     @RequestBody ThesisReqDto thesisReqDto) {
        ThesisResDto thesisResDto = thesisService.updateThesis(thesisId, thesisReqDto);
        return new ResponseEntity<>(thesisResDto, HttpStatus.OK);
    }

    @Operation(summary = "논문 삭제 API", description = "논문 삭제")
    @DeleteMapping("/{thesisId}")
    public ResponseEntity<?> deleteThesis(@PathVariable(name = "thesisId") Long thesisId) {
        thesisService.deleteThesis(thesisId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
