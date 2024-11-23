package org.example.backend.timetable.service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.seminarRoom.repository.SeminarRoomRepository;
import org.example.backend.timetable.domain.Timetable;
import org.example.backend.timetable.domain.dto.TimetableReqDto;
import org.example.backend.timetable.domain.dto.TimetableResDto;
import org.example.backend.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TimetableService {
    private final TimetableRepository timetableRepository;
    private final SeminarRoomRepository seminarRoomRepository;

    @Transactional
    public TimetableResDto createTimetable(TimetableReqDto reqDto) {
        SeminarRoom seminarRoom = seminarRoomRepository.findById(reqDto.getSeminarRoomId())
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));

        validateTimeRange(reqDto);

        Timetable timetable = Timetable.of(reqDto, seminarRoom);
        timetableRepository.save(timetable);

        return TimetableResDto.of(timetable);
    }

    public List<TimetableResDto> getAllTimetables() {
        return timetableRepository.findAll().stream()
                .map(TimetableResDto::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public TimetableResDto updateTimetable(Long timetableId, TimetableReqDto reqDto) {
        Timetable timetable = timetableRepository.findById(timetableId)
                .orElseThrow(() -> new IllegalArgumentException("시간표가 존재하지 않습니다."));

        SeminarRoom seminarRoom = seminarRoomRepository.findById(reqDto.getSeminarRoomId())
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));

        validateTimeRange(reqDto);

        timetable.update(reqDto, seminarRoom);
        return TimetableResDto.of(timetable);
    }

    @Transactional
    public void deleteTimetable(Long timetableId) {
        Timetable timetable = timetableRepository.findById(timetableId)
                .orElseThrow(() -> new IllegalArgumentException("시간표가 존재하지 않습니다."));
        timetableRepository.delete(timetable);
    }

    private void validateTimeRange(TimetableReqDto reqDto) {
        if (reqDto.getStartDate().isAfter(reqDto.getEndDate())) {
            throw new IllegalArgumentException("시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
        }
        if (reqDto.getStartTime().isAfter(reqDto.getEndTime())) {
            throw new IllegalArgumentException("시작 시간은 종료 시간보다 이후일 수 없습니다.");
        }
    }
}