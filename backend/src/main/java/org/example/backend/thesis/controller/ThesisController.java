package org.example.backend.thesis.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.thesis.domain.dto.ThesisReqDto;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.service.ThesisService;
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
@Tag(name = "논문", description = "논문 API")
@RequestMapping("/api/thesis")
public class ThesisController {

    private final ThesisService thesisService;

    @ApiOperation(value = "논문 생성 API", notes = "논문 생성")
    @PostMapping
    public ResponseEntity<Long> createThesis(@RequestBody ThesisReqDto thesisReqDto) {
        Long thesisId = thesisService.saveThesis(thesisReqDto);
        return new ResponseEntity<>(thesisId, HttpStatus.OK);
    }

    @ApiOperation(value = "논문 상세 정보 반환 API", notes = "논문 상세 정보 반환")
    @GetMapping("/{thesisId}")
    public ResponseEntity<ThesisResDto> getThesis(@PathVariable(name = "thesisId") Long thesisId) {
        ThesisResDto thesisResDto = thesisService.getThesis(thesisId);
        return new ResponseEntity<>(thesisResDto, HttpStatus.OK);
    }

    @ApiOperation(value = "논문 정보 업데이트 API", notes = "논문 정보 업데이트")
    @PostMapping("/{thesisId}")
    public ResponseEntity<ThesisResDto> updateThesis(@PathVariable(name = "thesisId") Long thesisId,
                                                     @RequestBody ThesisReqDto thesisReqDto) {
        ThesisResDto thesisResDto = thesisService.updateThesis(thesisId, thesisReqDto);
        return new ResponseEntity<>(thesisResDto, HttpStatus.OK);
    }

    @ApiOperation(value = "논문 삭제 API", notes = "논문 삭제")
    @DeleteMapping("/{thesisId}")
    public ResponseEntity<?> deleteThesis(@PathVariable(name = "thesisId") Long thesisId) {
        thesisService.deleteThesis(thesisId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
