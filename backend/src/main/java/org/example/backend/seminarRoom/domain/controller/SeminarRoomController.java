package org.example.backend.seminarRoom.domain.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.seminarRoom.domain.dto.SeminarRoomReqDto;
import org.example.backend.seminarRoom.domain.dto.SeminarRoomResDto;
import org.example.backend.seminarRoom.service.SeminarRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seminar-rooms")
public class SeminarRoomController {
    private final SeminarRoomService seminarRoomService;

    @PostMapping
    public ResponseEntity<SeminarRoomResDto> createSeminarRoom(@RequestBody SeminarRoomReqDto reqDto) {
        SeminarRoomResDto resDto = seminarRoomService.createSeminarRoom(reqDto);
        return ResponseEntity.ok(resDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeminarRoomResDto> getSeminarRoom(@PathVariable Long id) {
        SeminarRoomResDto resDto = seminarRoomService.getSeminarRoom(id);
        return ResponseEntity.ok(resDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeminarRoomResDto> updateSeminarRoom(
            @PathVariable Long id,
            @RequestBody SeminarRoomReqDto reqDto) {
        SeminarRoomResDto resDto = seminarRoomService.updateSeminarRoom(id, reqDto);
        return ResponseEntity.ok(resDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeminarRoom(@PathVariable Long id) {
        seminarRoomService.deleteSeminarRoom(id);
        return ResponseEntity.ok().build();
    }
}