package org.example.backend.timetable.domain.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.timetable.domain.WeekDay;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimetableReqDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Set<WeekDay> weekDays;
    private Long seminarRoomId;

    @Builder
    private TimetableReqDto(LocalDate startDate, LocalDate endDate, LocalTime startTime,
                            LocalTime endTime, Set<WeekDay> weekDays, Long seminarRoomId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.weekDays = weekDays;
        this.seminarRoomId = seminarRoomId;
    }

    public static TimetableReqDto of(LocalDate startDate, LocalDate endDate, LocalTime startTime,
                                     LocalTime endTime, Set<WeekDay> weekDays, Long seminarRoomId) {
        return TimetableReqDto.builder()
                .startDate(startDate)
                .endDate(endDate)
                .startTime(startTime)
                .endTime(endTime)
                .weekDays(weekDays)
                .seminarRoomId(seminarRoomId)
                .build();
    }
}