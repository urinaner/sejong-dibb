package org.example.backend.timetable.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import org.example.backend.timetable.domain.Timetable;
import org.example.backend.timetable.domain.WeekDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    @Query("SELECT COUNT(t) > 0 FROM Timetable t " +
            "WHERE t.seminarRoom.id = :seminarRoomId " +
            "AND :date BETWEEN t.startDate AND t.endDate " +
            "AND t.startTime < :endTime " +
            "AND t.endTime > :startTime " +
            "AND :weekDay MEMBER OF t.weekDays")
    boolean existsByTimeOverlap(
            @Param("seminarRoomId") Long seminarRoomId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("weekDay") WeekDay weekDay
    );
}
