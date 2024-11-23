package org.example.backend.timetable.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.timetable.domain.dto.TimetableReqDto;
import org.example.backend.timetable.domain.dto.TimetableResDto;
import org.example.backend.timetable.service.TimetableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/timetables")
public class TimetableController {
    private final TimetableService timetableService;

    @PostMapping
    public ResponseEntity<TimetableResDto> createTimetable(@RequestBody TimetableReqDto reqDto) {
        TimetableResDto resDto = timetableService.createTimetable(reqDto);
        return ResponseEntity.ok(resDto);
    }
    @GetMapping
    public ResponseEntity<List<TimetableResDto>> getAllTimetables() {
        List<TimetableResDto> timetables = timetableService.getAllTimetables();
        return ResponseEntity.ok(timetables);
    }

    @PutMapping("/{timetableId}")
    public ResponseEntity<TimetableResDto> updateTimetable(
            @PathVariable Long timetableId,
            @RequestBody TimetableReqDto reqDto) {
        TimetableResDto resDto = timetableService.updateTimetable(timetableId, reqDto);
        return ResponseEntity.ok(resDto);
    }

    @DeleteMapping("/{timetableId}")
    public ResponseEntity<Void> deleteTimetable(@PathVariable Long timetableId) {
        timetableService.deleteTimetable(timetableId);
        return ResponseEntity.ok().build();
    }
}
