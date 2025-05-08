package org.example.backend.reservation.repository;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.LockModeType;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
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
