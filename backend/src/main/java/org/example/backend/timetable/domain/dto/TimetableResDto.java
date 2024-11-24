package org.example.backend.timetable.domain.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.timetable.domain.Timetable;
import org.example.backend.timetable.domain.WeekDay;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimetableResDto {
    private Long timetableId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Set<WeekDay> weekDays;
    private String seminarRoomName;

    @Builder
    private TimetableResDto(Long timetableId, LocalDate startDate, LocalDate endDate,
                            LocalTime startTime, LocalTime endTime, Set<WeekDay> weekDays,
                            String seminarRoomName) {
        this.timetableId = timetableId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.weekDays = weekDays;
        this.seminarRoomName = seminarRoomName;
    }

    public static TimetableResDto of(Timetable timetable) {
        return TimetableResDto.builder()
                .timetableId(timetable.getTimetableId())
                .startDate(timetable.getStartDate())
                .endDate(timetable.getEndDate())
                .startTime(timetable.getStartTime())
                .endTime(timetable.getEndTime())
                .weekDays(timetable.getWeekDays())
                .seminarRoomName(timetable.getSeminarRoom().getName())
                .build();
    }
}