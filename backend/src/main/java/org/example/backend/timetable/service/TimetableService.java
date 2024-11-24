package org.example.backend.timetable.service;

import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.NOT_FOUND_SEMINAR_ROOM;
import static org.example.backend.timetable.exception.TimetableExceptionType.NOT_FOUND_TIMETABLE;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.seminarRoom.exception.SeminarRoomException;
import org.example.backend.seminarRoom.repository.SeminarRoomRepository;
import org.example.backend.timetable.domain.Timetable;
import org.example.backend.timetable.domain.dto.TimetableReqDto;
import org.example.backend.timetable.domain.dto.TimetableResDto;
import org.example.backend.timetable.exception.TimetableException;
import org.example.backend.timetable.exception.TimetableExceptionType;
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
                .orElseThrow(() -> new TimetableException(NOT_FOUND_TIMETABLE));

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
                .orElseThrow(() -> new TimetableException(NOT_FOUND_TIMETABLE));

        SeminarRoom seminarRoom = seminarRoomRepository.findById(reqDto.getSeminarRoomId())
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));

        validateTimeRange(reqDto);

        timetable.update(reqDto, seminarRoom);
        return TimetableResDto.of(timetable);
    }

    @Transactional
    public void deleteTimetable(Long timetableId) {
        Timetable timetable = timetableRepository.findById(timetableId)
                .orElseThrow(() -> new TimetableException(NOT_FOUND_TIMETABLE));
        timetableRepository.delete(timetable);
    }

    private void validateTimeRange(TimetableReqDto reqDto) {
        if (reqDto.getStartDate().isAfter(reqDto.getEndDate())) {
            throw new TimetableException(TimetableExceptionType.INVALID_INPUT_TIME);
        }
        if (reqDto.getStartTime().isAfter(reqDto.getEndTime())) {
            throw new TimetableException(TimetableExceptionType.INVALID_INPUT_TIME);
        }
    }
}