package org.example.backend.room.domain.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.room.domain.dto.RoomReqDto;
import org.example.backend.room.domain.dto.RoomResDto;
import org.example.backend.room.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seminar-rooms")
public class RoomController {
    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomResDto> createSeminarRoom(@RequestBody RoomReqDto reqDto) {
        RoomResDto resDto = roomService.createSeminarRoom(reqDto);
        return ResponseEntity.ok(resDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResDto> getSeminarRoom(@PathVariable Long id) {
        RoomResDto resDto = roomService.getSeminarRoom(id);
        return ResponseEntity.ok(resDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResDto> updateSeminarRoom(
            @PathVariable Long id,
            @RequestBody RoomReqDto reqDto) {
        RoomResDto resDto = roomService.updateSeminarRoom(id, reqDto);
        return ResponseEntity.ok(resDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeminarRoom(@PathVariable Long id) {
        roomService.deleteSeminarRoom(id);
        return ResponseEntity.ok().build();
    }
}