package org.example.backend.timetable.domain;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.timetable.domain.dto.TimetableReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "timetable")
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timetableId;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<WeekDay> weekDays = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seminar_room_id")
    private SeminarRoom seminarRoom;

    @Builder
    private Timetable(LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime,
                      Set<WeekDay> weekDays, SeminarRoom seminarRoom) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.weekDays = weekDays;
        this.seminarRoom = seminarRoom;
    }

    public static Timetable of(TimetableReqDto dto, SeminarRoom seminarRoom) {
        return Timetable.builder()
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .weekDays(dto.getWeekDays())
                .seminarRoom(seminarRoom)
                .build();
    }

    public void update(TimetableReqDto dto, SeminarRoom seminarRoom) {
        this.startDate = dto.getStartDate();
        this.endDate = dto.getEndDate();
        this.startTime = dto.getStartTime();
        this.endTime = dto.getEndTime();
        this.weekDays = dto.getWeekDays();
        this.seminarRoom = seminarRoom;
    }
}