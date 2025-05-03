package org.example.backend.reservationslot.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.example.backend.reservationslot.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationSlotRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT COUNT(r) > 0 FROM Reservation r " +
            "WHERE r.room.id = :seminarRoomId " +
            "AND r.startTime < :endTime " +
            "AND r.endTime > :startTime")
    boolean existsByTimePeriod(
            @Param("seminarRoomId") Long seminarRoomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);

    @Query("SELECT r FROM Reservation r " +
            "WHERE r.room.id = :roomId " +
            "AND DATE_FORMAT(r.startTime, '%Y-%m-%d') = :date")
    List<Reservation> findAllByDateAndStatus(
            @Param("roomId") Long roomId,
            @Param("date") String date
    );

    @Query("SELECT r FROM Reservation r " +
            "WHERE r.room.id = :roomId " +
            "AND DATE_FORMAT(r.startTime, '%Y-%m') = :yearMonth " +
            "ORDER BY r.startTime")
    List<Reservation> findAllByRoomAndYearMonth(
            @Param("roomId") Long roomId,
            @Param("yearMonth") String yearMonth
    );
}
